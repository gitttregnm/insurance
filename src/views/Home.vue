<template>
  <div>
    <div class="banner-index">
      <img src="../assets/banner.jpg"/>
    </div>
    <div class="bgf p-tag article-block">
      <p class="text-center">
         <b>安心选：给孩子和家庭免费定制终身保护规划</b>
      </p>

      <p>
        需要对您的实际情况进行了解，规划师系统对比市场中千款保险产品，量身定制出3套规划方案供参考。问卷填答耗时3分钟左右。
      </p>
      <router-link to="/case" class="align-right">
        <el-button type="success" plain size="mini">案例展示—点击查看</el-button>
      </router-link>
    </div>
    <div class="m-t-10 bgf">
      <div class="bgf p-10">
        <el-divider>
          <el-link type="info" plain size="mini">选择为谁规划</el-link>
        </el-divider>
        <div class="form-home">
          <el-form ref="form" :model="form" label-width="40px" size="mini">
            <el-form-item label="" prop="resource">
              <el-radio-group v-model="form.resource">
                <el-radio :label="1">为自己做个人规划</el-radio>
                <br/>
                <el-radio :label="2">为孩子做长期规划</el-radio>
                <br/>
                <el-radio :label="3">以家庭为单位做规划</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="m-l-50" v-show="form.resource == 3">
              <el-checkbox-group v-model="form.type">
                <el-checkbox :label="1" name="type">夫妻2人家庭</el-checkbox>
                <el-checkbox :label="2" name="type"
                >夫妻3人家庭（1小孩）
                </el-checkbox
                >
                <el-checkbox :label="3" name="type"
                >夫妻4人家庭（2小孩）
                </el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <div class="text-center f-12 g-c">更多规划类型算法陆续开发中</div>
            </el-form-item>
            <el-form-item class="text-center">
              <el-button type="success" plain @click="onSubmit" size="mini"
              >下一步
              </el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        form: {
          resource: "",
          type: []
        }
      };
    },
    watch: {
      "form.resource"() {
        if (this.form.resource != 3) {
          this.form.type = [];
        }
        let typeSel='';
        switch (this.form.resource) {
          case 1:{typeSel='person'} break;
          case 2:{typeSel='child'} break;
          case 3:{typeSel='faimly'} break;
        }
        this.$store.dispatch('resiteType',typeSel);
      },
      "form.type"() {
        const value=Math.max.apply(null,this.form.type);
        switch (value) {
          case 1: {
            this.$store.dispatch("resiteChildNum", 0);
          }
            break;
          case 2: {
            this.$store.dispatch("resiteChildNum", 1);
          }
            break;
          case 3: {
            this.$store.dispatch("resiteChildNum", 2);
          }
            break;
        }
      }
    },
    methods: {
      onSubmit() {
        let pathL = "/baseInfo";
        if (this.form.resource) {
          switch (this.form.resource) {
            case 1: {
              pathL = `/person${pathL}`;
              this.$store.dispatch('resiteFormType','person')
            }
              break;
            case 2: {
              pathL = `/children/index`;
              this.$store.dispatch('resiteFormType','children')
            }
              break;
            case 3: {
              pathL = `/family${pathL}`;
              this.$store.dispatch('resiteFormType','family')
            }
              break;
          }

        } else {
          this.$message("请选择规划项");
          return;
        }
        this.$router.push({
          path: pathL,
          query: {
            name: this.form.resource
          }
        });

      }
    }
  };
</script>
