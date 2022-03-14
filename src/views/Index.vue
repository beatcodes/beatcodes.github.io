<template>
  <div class="cas-m-wrap">
    <div>
      hello ggg ffdfd
    </div>
    <el-cascader
      :props="props"
      :show-all-levels="false"
      @visible-change="(v) => visibleChange(v, 'cascader', cascaderClick)"
      ref="cascader"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  data() {
    let _self = this;
    return {
      id: 0,
      props: {
        lazy: true,
        checkStrictly: true,
        async lazyLoad(node, resolve) {
          const { level } = node;
          console.log("level = ", level);
          const nodes = await _self.loadFilterData();
          resolve(nodes);
        },
      },
    };
  },
  props: {
    eData: {
      type: Object,
    },
  },
  methods: {
    cascaderClick() {
      console.log("cascader click");
    },
    async loadFilterData() {
      return new Promise((resolve) => {
        let list = [];
        setTimeout(() => {
          list.push({
            value: Math.random(10) * 10,
            label: `选项${this.id}`,
            leaf: false,
          });
          resolve(list);
        }, 2000);
      });
    },
    /**
     * 为element-ui的Select和Cascader添加弹层底部操作按钮
     * @param visible
     * @param refName 设定的ref名称
     * @param onClick 底部操作按钮点击监听
     */
    visibleChange(visible, refName, onClick) {
      if (visible) {
        this.$nextTick(() => {
          const _ref = this.$refs[refName];
          let popper = _ref.$children[1] || _ref.$refs.popper;
          console.log(
            "$$$ popper = ",
            _ref[0].$children[1],
            " popper2 = ",
            _ref.$refs.popper
          );
          if (popper.$el) {
            popper = popper.$el;
          }
          console.log("### visibleChange popper ", popper);
          let hasButton = false;
          if (popper.children) {
            hasButton = Array.from(popper.children).some((item) => {
              return item.hasAttribute("isButton");
            });
          }
          if (!hasButton) {
            const el = document.createElement("div");
            el.setAttribute("isButton", "true");
            el.style =
              "border-top: solid 1px #E4E7ED; padding:0; color: #606266;";
            popper.appendChild(el);
            const btnWrap = document.createElement("div");
            btnWrap.className = "cas-btn-wrap";
            el.appendChild(btnWrap);

            const confirm = document.createElement("span");
            confirm.className = "cas-btn cas-btn-blue";
            confirm.innerHTML = "确定";
            btnWrap.appendChild(confirm);

            const cancel = document.createElement("span");
            cancel.className = "cas-btn";
            cancel.innerHTML = "取消";
            btnWrap.appendChild(cancel);

            confirm.onclick = () => {
              this.currentObject = this.selectObject;
              let emitObject = {
                obj: this.currentObject,
              };
              this.$emit("objectChange", emitObject);
              // 底部按钮的点击事件 点击后想触发的逻辑也可以直接写在这
              onClick && onClick();

            };
            cancel.onclick = () => {

            };
          }
        });
      }
    },
  },
};
</script>

<style>
.cas-m-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
}
.el-input__inner {
  background-color: transparent;
  border-radius: 10px;
  font-size: 16px;
  width: 116px;
  height: 26px;
  border-color: rgba(24, 171, 194, 1);
}

input::-webkit-input-placeholder {
  color: rgba(24, 171, 194, 1);
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(24, 171, 194, 1);
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(24, 171, 194, 1);
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(24, 171, 194, 1);
}
.cas-btn-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.cas-btn {
  padding: 4px 15px;
  margin: 6px 6px;
  border: 1px solid #409eff;
  border-radius: 16px;
  font-size: 13px;
  font-weight: bold;
}

.cas-btn-blue {
  background-color: #409eff;
  color: white;
}
</style>
