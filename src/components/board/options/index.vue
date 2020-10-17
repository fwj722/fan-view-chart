<template>
  <div :class="{'board-options': true, 'is-expand': optionsExpand}"
       :style="config.style">
    <div class="header-title" v-if="config.title&&config.title.enable">
      <span v-if="!currentSelected">{{ config.title.text }}</span>
      <div class="tabs" v-else>
        <div class="tab-item" :class="{'active':tabsType===0}" @click="tabsType=0">
          <el-tooltip content="配置" placement="top">
            <i class="iconfont iconRectangleCopy"></i>
          </el-tooltip>
        </div>
        <div class="tab-item" :class="{'active':tabsType===1}" @click="tabsType=1">
          <el-tooltip content="数据" placement="top">
            <i class="iconfont iconshuju1"></i>
          </el-tooltip>
        </div>
        <div class="tab-item" :class="{'active':tabsType===2}" @click="tabsType=2">
          <el-tooltip content="交互" placement="top">
            <i class="iconfont iconjiaohu"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="options-body">
      <el-scrollbar style="height: 100%;">
        <div class="page-config" v-if="!currentSelected">
          <gui-field label="屏幕大小">
            <div class="gui-inline">
              <el-input-number v-model="globalSettings.width" :predefine="predefineColors" controls-position="right" size="mini"
                              @change="setPageSetting"></el-input-number>
              <div class="label">宽度</div>
            </div>
            <div class="gui-inline">
              <el-input-number v-model="globalSettings.height" controls-position="right" size="mini"
                              @change="setPageSetting"></el-input-number>
              <div class="label">高度</div>
            </div>
          </gui-field>
          <gui-field label="背景颜色">
            <el-color-picker  v-model="globalSettings.backgroundColor" show-alpha  @active-change="setPageSetting"></el-color-picker>
          </gui-field>
          <gui-field label="栅格间距">
            <el-input-number v-model="globalSettings.gridStep" size="mini" controls-position="right" :min="2" :max="20"
                            @change="setPageSetting"></el-input-number>
          </gui-field>
          <gui-field label="重置">
            <el-button type="primary" size="mini" @click="resetSetting">恢复默认配置</el-button>
          </gui-field>
        </div>
        <div class="block-config" v-else>
          <div v-if="tabsType===0">
            <gui-group group-name="基础属性">
              <gui-field label="图表尺寸">
                <gui-inline label="宽度">
                  <el-input-number v-model="baseProperty.width" size="mini" controls-position="right"
                                  @change="setBaseProperty"></el-input-number>
                </gui-inline>
                <gui-inline label="高度">
                  <el-input-number v-model="baseProperty.height" size="mini" controls-position="right"
                                  @change="setBaseProperty"></el-input-number>
                </gui-inline>
              </gui-field>
              <gui-field label="图表位置">
                <gui-inline label="横坐标">
                  <el-input-number v-model="baseProperty.x" size="mini" controls-position="right"
                                  @change="setBaseProperty"></el-input-number>
                </gui-inline>
                <gui-inline label="纵坐标"> 
                  <el-input-number v-model="baseProperty.y" size="mini" controls-position="right"
                                  @change="setBaseProperty"></el-input-number>
                </gui-inline>
              </gui-field>
            </gui-group>
            <el-collapse v-model="collapseActive" simple accordion>
              <!--grid-->
              <template v-if="showGrid">
                <el-collapse-item title="全局样式" name="grid">
                  <gui-wrap label="边距" :value="true" simple>
                    <gui-field label="顶部">
                      <el-input-number v-model="selfConfig.grid.top" size="mini" controls-position="right"
                                      :min="0" :max="60" @change="setSelfProperty"></el-input-number>
                    </gui-field>
                    <gui-field label="底部">
                      <el-input-number v-model="selfConfig.grid.bottom" size="mini" controls-position="right"
                                      :min="0" :max="60" @change="setSelfProperty"></el-input-number>
                    </gui-field>
                    <gui-field label="左侧">
                      <el-input-number v-model="selfConfig.grid.left" size="mini" controls-position="right"
                                      :min="0" :max="60" @change="setSelfProperty"></el-input-number>
                    </gui-field>
                    <gui-field label="右侧">
                      <el-input-number v-model="selfConfig.grid.right" size="mini" controls-position="right"
                                      :min="0" :max="60" @change="setSelfProperty"></el-input-number>
                    </gui-field>
                  </gui-wrap>
                </el-collapse-item>
              </template>
              <!--标题-->
              <template v-if="selfConfig.title">
                <el-collapse-item title="标题" name="title">
                  <gui-field label="标题名">
                    <el-input v-model="selfConfig.title.content" size="mini" @change="setSelfProperty"></el-input>
                  </gui-field>
                  <gui-field label="文本">
                    <gui-inline label="字号">
                      <el-input-number v-model="selfConfig.title.textStyle.fontSize" size="mini" controls-position="right"
                                      :min="12" :max="40" @change="setSelfProperty"></el-input-number>
                    </gui-inline>
                    <gui-inline label="颜色">
                      <el-color-picker v-model="selfConfig.title.textStyle.color"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="对齐方式">
                    <el-select v-model="selfConfig.title.textAlign" size="mini"
                               @change="setSelfProperty">
                      <el-option label="left" value="left"></el-option>
                      <el-option label="center" value="center"></el-option>
                      <el-option label="right" value="right"></el-option>
                    </el-select>
                  </gui-field>
                </el-collapse-item>
              </template>
              <!--图例-->
              <template v-if="selfConfig.legend">
                <el-collapse-item title="图例" name="legend">
                  <gui-wrap label="图例" v-model="selfConfig.legend.show" @change="setSelfProperty">
                    <gui-field label="文本">
                      <gui-inline label="字号">
                        <el-input-number v-model="selfConfig.legend.textStyle.fontSize" size="mini" controls-position="right"
                                        :min="12" :max="40" @change="setSelfProperty"></el-input-number>
                      </gui-inline>
                      <gui-inline label="颜色">
                        <el-color-picker v-model="selfConfig.legend.textStyle.color"
                                         @change="setSelfProperty"></el-color-picker>
                      </gui-inline>
                    </gui-field>
                    <gui-field label="样式">
                      <gui-inline label="图例间隔">
                        <el-input-number v-model="selfConfig.legend.itemGap" size="mini" controls-position="right"
                                        :min="0" :max="50" @change="setSelfProperty"></el-input-number>
                      </gui-inline>
                      <gui-inline label="图标">
                        <el-select v-model="selfConfig.legend.icon" size="mini"
                                   @change="setSelfProperty" :value="selfConfig.legend.icon">
                          <el-option label="normal" value="normal"></el-option>
                          <el-option label="circle" value="circle"></el-option>
                          <el-option label="rect" value="rect"></el-option>
                          <el-option label="roundRect" value="roundRect"></el-option>
                          <el-option label="diamond" value="diamond"></el-option>
                        </el-select>
                      </gui-inline>
                    </gui-field>
                    <gui-field label="上下位置">
                      <gui-inline label="top">
                        <el-select v-model="selfConfig.legend.top" size="mini"
                                   @change="setSelfProperty" :value="selfConfig.legend.top">
                          <el-option label="auto" value="auto"></el-option>
                          <el-option label="top" value="top"></el-option>
                          <el-option label="middle" value="middle"></el-option>
                          <el-option label="bottom" value="bottom"></el-option>
                        </el-select>
                      </gui-inline>
                      <gui-inline label="bottom">
                        <el-select v-model="selfConfig.legend.bottom" size="mini"
                                   @change="setSelfProperty" :value="selfConfig.legend.bottom">
                          <el-option label="auto" value="auto"></el-option>
                          <el-option label="top" value="top"></el-option>
                          <el-option label="middle" value="middle"></el-option>
                          <el-option label="bottom" value="bottom"></el-option>
                        </el-select>
                      </gui-inline>
                    </gui-field>
                    <gui-field label="左右位置">
                      <gui-inline label="left">
                        <el-select v-model="selfConfig.legend.left" size="mini"
                                   @change="setSelfProperty" :value="selfConfig.legend.left">
                          <el-option label="auto" value="auto"></el-option>
                          <el-option label="left" value="left"></el-option>
                          <el-option label="center" value="center"></el-option>
                          <el-option label="right" value="right"></el-option>
                        </el-select>
                      </gui-inline>
                      <gui-inline label="right">
                        <el-select v-model="selfConfig.legend.right" size="mini"
                                   @change="setSelfProperty" :value="selfConfig.legend.right">
                          <el-option label="auto" value="auto"></el-option>
                          <el-option label="left" value="left"></el-option>
                          <el-option label="center" value="center"></el-option>
                          <el-option label="right" value="right"></el-option>
                        </el-select>
                      </gui-inline>
                    </gui-field>
                  </gui-wrap>
                </el-collapse-item>
              </template>
              <!--雷达图独有-->
              <template v-if="isRadar">
                <el-collapse-item title="极轴" name="radar">
                  <gui-field label="中心坐标">
                    <gui-inline label="offsetX">
                      <el-input v-model="selfConfig.radar.center[0]" size="mini"
                               placeholder="支持百分比或像素" @change="setSelfProperty"></el-input>
                    </gui-inline>
                    <gui-inline label="offsetY">
                      <el-input v-model="selfConfig.radar.center[1]" size="mini"
                               placeholder="支持百分比或像素" @change="setSelfProperty"></el-input>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="雷达图半径">
                    <el-input v-model="selfConfig.radar.radius" size="mini" @change="setSelfProperty"></el-input>
                  </gui-field>
                  <gui-field label="雷达图类型">
                    <el-select v-model="selfConfig.radar.shape" size="mini"
                               @change="setSelfProperty" :value="selfConfig.radar.shape">
                      <el-option label="circle" value="circle"></el-option>
                      <el-option label="polygon" value="polygon"></el-option>
                    </el-select>
                  </gui-field>
                </el-collapse-item>
              </template>
              <!--x轴-->
              <template v-if="showXAxis">
                <el-collapse-item title="x轴" name="xAxis">
                  <gui-field label="是否显示">
                    <el-switch v-model="selfConfig.xAxis.show" size="mini" @change="setSelfProperty"></el-switch>
                  </gui-field>
                  <gui-field label="文本">
                    <gui-inline label="字号">
                      <el-input-number v-model="selfConfig.xAxis.axisLabel.fontSize" size="mini" controls-position="right"
                                      :min="12" :max="40" @change="setSelfProperty"></el-input-number>
                    </gui-inline>
                    <gui-inline label="颜色">
                      <el-color-picker v-model="selfConfig.xAxis.axisLabel.color"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="倾斜角度">
                    <el-input-number v-model="selfConfig.xAxis.axisLabel.rotate" size="mini" controls-position="right"
                                    :min="0" :max="90" @change="setSelfProperty"></el-input-number>
                  </gui-field>
                  <gui-wrap label="轴线" v-model="selfConfig.xAxis.axisLine.show" @change="setSelfProperty">
                    <gui-field label="轴线颜色">
                      <el-color-picker v-model="selfConfig.xAxis.axisLine.lineStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-field>
                  </gui-wrap>
                  <gui-wrap label="网格线" v-model="selfConfig.xAxis.splitLine.show" @change="setSelfProperty">
                    <gui-field label="网格线颜色">
                      <el-color-picker v-model="selfConfig.xAxis.splitLine.lineStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-field>
                  </gui-wrap>
                </el-collapse-item>
              </template>
              <!--y轴-->
              <template v-if="showYAxis">
                <el-collapse-item title="y轴" name="yAxis">
                  <gui-field label="是否显示">
                    <el-switch v-model="selfConfig.xAxis.show" size="mini" @change="setSelfProperty"></el-switch>
                  </gui-field>
                  <gui-field label="文本">
                    <gui-inline label="字号">
                      <el-input-number v-model="selfConfig.xAxis.axisLabel.fontSize" size="mini" controls-position="right"
                                      :min="12" :max="40" @change="setSelfProperty"></el-input-number>
                    </gui-inline>
                    <gui-inline label="颜色">
                      <el-color-picker v-model="selfConfig.xAxis.axisLabel.color"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-wrap label="轴线" v-model="selfConfig.yAxis.axisLine.show" @change="setSelfProperty">
                    <gui-field label="轴线颜色">
                      <el-color-picker v-model="selfConfig.yAxis.axisLine.lineStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-field>
                  </gui-wrap>
                  <gui-wrap label="网格线" v-model="selfConfig.yAxis.splitLine.show" @change="setSelfProperty">
                    <gui-field label="网格线颜色">
                      <el-color-picker v-model="selfConfig.yAxis.splitLine.lineStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-field>
                  </gui-wrap>
                </el-collapse-item>
              </template>
              <!--地图独有-->
              <template v-if="isMap">
                <el-collapse-item title="视觉映射" name="map">
                  <gui-field label="是否显示">
                    <el-switch v-model="selfConfig.visualMap.show" size="mini" @change="setSelfProperty"></el-switch>
                  </gui-field>
                  <gui-field label="类型">
                    <el-select v-model="selfConfig.visualMap.type" size="mini"
                               @change="setSelfProperty" :value="selfConfig.visualMap.type">
                      <el-option label="分段型" value="piecewise"></el-option>
                      <el-option label="连续型" value="continuous"></el-option>
                    </el-select>
                  </gui-field>
                  <gui-field label="极值">
                    <gui-inline label="最小值">
                      <el-input-number v-model="selfConfig.visualMap.min" size="mini" :min="0" controls-position="right"
                                      @change="setSelfProperty"></el-input-number>
                    </gui-inline>
                    <gui-inline label="最大值">
                      <el-input-number v-model="selfConfig.visualMap.max" size="mini" :min="0" controls-position="right"
                                      @change="setSelfProperty"></el-input-number>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="文本">
                    <gui-inline label="字号">
                      <el-input-number v-model="selfConfig.visualMap.textStyle.fontSize" size="mini" controls-position="right"
                                      :min="12" :max="40" @change="setSelfProperty"></el-input-number>
                    </gui-inline>
                    <gui-inline label="颜色">
                      <el-color-picker v-model="selfConfig.visualMap.textStyle.color"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="图元大小">
                    <gui-inline label="最小值">
                      <el-input-number v-model="selfConfig.visualMap.inRange.symbolSize[0]" size="mini" :min="0" controls-position="right"
                                      @change="setSelfProperty"></el-input-number>
                    </gui-inline>
                    <gui-inline label="最大值">
                      <el-input-number v-model="selfConfig.visualMap.inRange.symbolSize[1]" size="mini" :min="0" controls-position="right"
                                      @change="setSelfProperty"></el-input-number>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="图元颜色">
                    <div>
                      <gui-colors v-for="(c,index) of selfConfig.visualMap.inRange.color" :key="index+c">
                        <el-color-picker v-model="selfConfig.visualMap.inRange.color[index]"
                                         :predefine="predefineColors" @change="setSelfProperty"></el-color-picker>
                      </gui-colors>
                    </div>
                  </gui-field>
                </el-collapse-item>
                <el-collapse-item title="地理坐标系" name="geo">
                  <gui-field label="视角缩放">
                    <el-input-number v-model="selfConfig.geo.zoom" size="mini" :min="0" :step="0.1" controls-position="right"
                                    @change="setSelfProperty"></el-input-number>
                  </gui-field>
                  <gui-wrap label="文本" v-model="selfConfig.geo.label.normal.show" @change="setSelfProperty">
                    <gui-field label="文本">
                      <gui-inline label="字号">
                        <el-input-number v-model="selfConfig.geo.label.normal.fontSize" size="mini" controls-position="right"
                                        :min="12" :max="40" @change="setSelfProperty"></el-input-number>
                      </gui-inline>
                      <gui-inline label="颜色">
                        <el-color-picker v-model="selfConfig.geo.label.normal.color"
                                         @change="setSelfProperty"></el-color-picker>
                      </gui-inline>
                    </gui-field>
                  </gui-wrap>
                  <gui-wrap label="文本悬停" v-model="selfConfig.geo.label.emphasis.show" @change="setSelfProperty">
                    <gui-field label="文本">
                      <gui-inline label="字号">
                        <el-input-number v-model="selfConfig.geo.label.emphasis.fontSize" size="mini" controls-position="right"
                                        :min="12" :max="40" @change="setSelfProperty"></el-input-number>
                      </gui-inline>
                      <gui-inline label="颜色">
                        <el-color-picker v-model="selfConfig.geo.label.emphasis.color"
                                         @change="setSelfProperty"></el-color-picker>
                      </gui-inline>
                    </gui-field>
                  </gui-wrap>
                  <gui-field label="多边形">
                    <gui-inline label="区域">
                      <el-color-picker v-model="selfConfig.geo.itemStyle.normal.areaColor"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                    <gui-inline label="边框">
                      <el-color-picker v-model="selfConfig.geo.itemStyle.normal.borderColor"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="多边形悬停">
                    <gui-inline label="区域" >
                      <el-color-picker v-model="selfConfig.geo.itemStyle.emphasis.areaColor"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                    <gui-inline label="边框">
                      <el-color-picker v-model="selfConfig.geo.itemStyle.emphasis.borderColor"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                </el-collapse-item>
              </template>
              <!--数据系列-->
              <template v-if="selfConfig.series">
                <el-collapse-item title="数据系列" name="series">
                  <gui-wrap label="指标"
                            v-model="selfConfig.series.label.show" @change="setSelfProperty">
                    <gui-field label="指标文本">
                      <gui-inline label="字号">
                        <el-input-number v-model="selfConfig.series.label.fontSize" size="mini" controls-position="right"
                                        :min="12" :max="40" @change="setSelfProperty"></el-input-number>
                      </gui-inline>
                      <gui-inline label="颜色">
                        <el-color-picker v-model="selfConfig.series.label.color"
                                         @change="setSelfProperty"></el-color-picker>
                      </gui-inline>
                    </gui-field>
                    <gui-field label="指标位置">
                      <el-select v-model="selfConfig.series.label.position" size="mini"
                                 @change="setSelfProperty" :value="selfConfig.series.label.position">
                        <el-option label="inside" value="inside"></el-option>
                        <!--饼图-->
                        <template v-if="isPie">
                          <el-option label="outside" value="outside"></el-option>
                        </template>
                        <template v-else>
                          <el-option label="top" value="top"></el-option>
                        </template>
                      </el-select>
                    </gui-field>
                  </gui-wrap>
                  <gui-wrap label="区域渐变" :value="true" simple v-if="isLine">
                    <gui-field label="区域透明度">
                      <el-input-number v-model="selfConfig.series.areaStyle.opacity" size="mini" controls-position="right"
                                      :max="1" :step="0.1" @change="setSelfProperty"></el-input-number>
                    </gui-field>
                  </gui-wrap>
                  <gui-field label="近似曲线" v-if="isLine">
                    <el-switch v-model="selfConfig.series.smooth" size="mini" @change="setSelfProperty"></el-switch>
                  </gui-field>
                  <gui-field label="柱条宽度" v-if="isHistogram">
                    <el-input size="mini" @change="setSelfProperty"
                             v-model="selfConfig.series.barWidth" clearable></el-input>
                  </gui-field>
                  <!--饼图独有-->
                  <template v-if="isPie">
                    <gui-field label="玫瑰图">
                      <el-switch v-model="selfConfig.series.roseType" size="mini"
                                @change="setSelfProperty"></el-switch>
                    </gui-field>
                    <gui-field label="中心坐标">
                      <gui-inline label="offsetX">
                        <el-input v-model="selfConfig.series.center[0]" size="mini"
                                 placeholder="默认50%"
                                 @change="setSelfProperty"></el-input>
                      </gui-inline>
                      <gui-inline label="offsetY">
                        <el-input v-model="selfConfig.series.center[1]" size="mini"
                                 placeholder="默认50%"
                                 @change="setSelfProperty"></el-input>
                      </gui-inline>
                    </gui-field>
                    <gui-field label="饼图半径">
                      <gui-inline label="内半径">
                        <el-input v-model="selfConfig.series.radius[0]" size="mini"
                                 placeholder="默认0"
                                 @change="setSelfProperty"></el-input>
                      </gui-inline>
                      <gui-inline label="外半径">
                        <el-input v-model="selfConfig.series.radius[1]" size="mini"
                                 placeholder="默认50%"
                                 @change="setSelfProperty"></el-input>
                      </gui-inline>
                    </gui-field>
                  </template>
                  <!--地图独有-->
                  <template v-if="isMap">
                    <gui-field label="类型">
                      <el-select v-model="selfConfig.series.type" size="mini"
                                 @change="setSelfProperty" :value="selfConfig.series.type">
                        <el-option label="散点/气泡" value="scatter"></el-option>
                        <el-option label="动画气泡" value="effectScatter"></el-option>
                      </el-select>
                    </gui-field>
                    <gui-field label="涟漪动画" v-if="selfConfig.series.type==='effectScatter'">
                      <gui-inline label="最大缩放比">
                        <el-input-number v-model="selfConfig.series.rippleEffect.scale" size="mini" controls-position="right"
                                        :step="0.5" @change="setSelfProperty"></el-input-number>
                      </gui-inline>
                      <gui-inline label="波纹方式">
                        <el-select v-model="selfConfig.series.rippleEffect.brushType" size="mini"
                                   @change="setSelfProperty" :value="selfConfig.series.rippleEffect.brushType">
                          <el-option label="stroke" value="stroke"></el-option>
                          <el-option label="fill" value="fill"></el-option>
                        </el-select>
                      </gui-inline>
                    </gui-field>
                    <gui-field label="气泡悬停">
                      <gui-inline label="边框宽度">
                        <el-input-number v-model="selfConfig.series.itemStyle.emphasis.borderWidth" size="mini" controls-position="right"
                                        :min="0" :max="2" @change="setSelfProperty"></el-input-number>
                      </gui-inline>
                      <gui-inline label="边框颜色">
                        <el-color-picker v-model="selfConfig.series.itemStyle.emphasis.borderColor"
                                         @change="setSelfProperty"></el-color-picker>
                      </gui-inline>
                    </gui-field>
                  </template>
                </el-collapse-item>
              </template>
              <!--颜色数组-->
              <template v-if="selfConfig.color">
                <el-collapse-item title="颜色数组" name="colors">
                  <div style="padding: 5px 13px;">
                    <gui-colors v-for="(c,index) of selfConfig.color" :key="index+c">
                      <el-color-picker  v-model="selfConfig.color[index]" :predefine="predefineColors"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-colors>
                  </div>
                </el-collapse-item>
              </template>
            </el-collapse>
          </div>
          <div v-else-if="tabsType===1">
            <gui-group group-name="数据映射">
              <gui-field label="x">
                <el-input v-model="apis.labelMap.x" size="mini" @change="setApiLabelMap"></el-input>
              </gui-field>
              <gui-field label="y">
                <el-input v-model="apis.labelMap.y" size="mini" @change="setApiLabelMap"></el-input>
              </gui-field>
              <gui-field label="s">
                <el-input v-model="apis.labelMap.s" size="mini" @change="setApiLabelMap"></el-input>
              </gui-field>
            </gui-group>
            <gui-group group-name="数据源">
              <div style="padding: 6px;">
                <el-input v-model="dataSource" type="textarea" @on-keyup.delete.stop autosize
                         placeholder="enter json data..." @change="dataSourceChange"></el-input>
              </div>
            </gui-group>
          </div>
          <div v-else>
            <div flex="main:center">暂无交互事件</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="expand-hover" @click="$emit('on-toggle')">
      <div class="inner">
        <i :class="optionsExpand?'el-icon-arrow-right':'el-icon-arrow-left'"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { setBaseProperty } from '../../../api/canvasMaps/canvas-maps-request'
  import { resetPageSettings, setPageSettings } from '@/api/app/app-request'
  import GuiGroup from './gui-group'
  import GuiWrap from './gui-wrap'
  import GuiField from './gui-field'
  import GuiInline from './gui-inline'
  import GuiColors from './gui-colors'
  import { DEFAULT_COLORS } from '../../../utils/defaultColors'
  import { deepClone } from '../../../utils/deepClone'
  import elScrollbar from '@/components/scrollbar/src/main'
  export default {
    name: 'BoardOptions',
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        tabsType: 0, // 0：配置，1：数据，2：交互
        globalSettings: { width: 0, height: 0, backgroundColor: '#0d2a42', gridStep: 1 },
        baseProperty: { width: 0, height: 0, x: 0, y: 0 }, // 配置-基础属性,
        collapseActive: null,
        selfConfig: {},
        apiData: {},
        apis: {},
        predefineColors: DEFAULT_COLORS,
        dataSource: null
      }
    },
    methods: {
      // 设置全局配置
      setPageSetting (val) {
        if(typeof val !== "number"){
          this.$set(this.globalSettings,"backgroundColor",val)
        }
        setPageSettings(this.globalSettings).then(res => {
          this.$store.dispatch('SetPageSettings',res.data)
        })
      },
      // 设置基本属性
      setBaseProperty () {
        this.$store.dispatch('SetBaseProperty', this.baseProperty)
        // 发送请求来保存数据
        setBaseProperty(this.currentSelected)
      },
      // 设置自有属性
      setSelfProperty () {
        this.$store.dispatch('SetSelfProperty', this.selfConfig)
        // 发送请求来保存数据
        setBaseProperty(this.currentSelected)
      },
      // 设置数据映射
      setApiLabelMap () {
        this.$store.dispatch('SetApis', this.apis)
        // 发送请求来保存数据
        setBaseProperty(this.currentSelected)
      },
      // 重置全局配置
      resetSetting () {
        // this.$loading.start()
        resetPageSettings().then(res => {
          this.$store.dispatch('SetPageSettings', res.data)
          // this.$loading.done()
        })
      },
      // 数据源改变事件
      dataSourceChange () {
        try {
          let source = JSON.parse(this.dataSource)
          this.apiData.source = [...source]
          this.$store.dispatch('SetSelfDataSource', this.apiData)
          // 发送请求来保存数据
          setBaseProperty(this.currentSelected)
        } catch (e) {
          console.warn('source is not a json string')
        }
      }
    },
    watch: {
      currentSelected: {
        handler (val) {
          if (val) {
            this.baseProperty = { ...val.packageJson.view }
            this.selfConfig = deepClone(val.packageJson.config)
            this.apiData = deepClone(val.packageJson.api_data)
            this.apis = deepClone(val.packageJson.apis)
            this.dataSource = JSON.stringify(this.apiData.source)
          }
        },
        deep: true
      },
      pageSettings: {
        handler (val) {
          if (val) {
            this.globalSettings = { ...val }
          }
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      ...mapGetters(['pageSettings', 'canvasRange', 'optionsExpand', 'currentSelected']),
      chartType () {
        return this.currentSelected ? this.currentSelected.packageJson.name : ''
      },
      isLine () {
        return this.chartType === 've-line'
      },
      isHistogram () {
        return this.chartType === 've-histogram'
      },
      isPie () {
        return this.chartType === 've-pie'
      },
      isRadar () {
        return this.chartType === 've-radar'
      },
      isMap () {
        return this.chartType === 've-map'
      },
      showGrid () {
        return this.selfConfig.grid && (this.isLine || this.isHistogram)
      },
      showXAxis () {
        return this.selfConfig.xAxis && (this.isLine || this.isHistogram)
      },
      showYAxis () {
        return this.selfConfig.yAxis && (this.isLine || this.isHistogram)
      }
    },
    components: { GuiGroup, GuiField, GuiInline, GuiColors, GuiWrap ,elScrollbar}
  }
</script>
