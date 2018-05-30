<template>
  <div class="main">
      <div class="title">todos</div>
      <input class="input" id="input" @keydown="addItem" v-model="message" placeholder="what needs to be done">
      <div class="itemList">
        <div class="item"  v-for="(item,index) in inputArrs" :key="item.name" v-if="isall?true: (isactive? item.ischecked == false : item.ischecked == true)" >
          <input type="checkbox" @change="checkChange" v-model="item.ischecked">
          <input type="button" @dblclick="changeItem($event)"  @change="enterEnd($event)" class="inputButton" :class="{'item-complete':item.ischecked}" :value="item.name">
          <span class="delete" @click="deleteItem(index)">X</span>
        </div>
      </div>

      <div class="bottomView" v-show="isshow">
          <div>{{itemsLeftNum}}items left</div>
          <div @click="all">All</div>
          <div @click="active">Active</div>
          <div @click="completed">Completed</div>
          <div @click="clear">clear completed</div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      itemsLeftNum: "0",
      inputArrs: [{ name: 22, ischecked: true }, { name: 2, ischecked: false }],
      isshow: true,
      isall: true,
      isactive: ""
    };
  },

  methods: {
    enterEnd: function(e) {
      this.changeItem(e);
    },
    changeItem: function(e) {
        e.target.type =  e.target.type== 'button' ?  'text' :  'button';
    },
    checkChange: function() {
      this.setLeftNum();
    },
    all: function() {
      this.isall = true;
    },
    active: function() {
      this.isall = false;
      this.isactive = true;
    },
    completed: function() {
      this.isall = false;
      this.isactive = false;
    },
    clear: function() {
      this.inputArrs = this.inputArrs.filter(function(i){
        return i.ischecked == false;
      });
      
      this.setLeftNum();
      this.isshow = this.inputArrs.length;
    },
    addItem: function() {
      //回车键的键值为13
      if (event.keyCode == 13 && this.message) {
        // 判断是否存在
        for (var i = 0; i < this.inputArrs.length; i++) {
          var object = this.inputArrs[i];
          if (object.name == this.message) {
            alert("存在");
            this.message = "";
            return;
          }
        }
        var arr = this.inputArrs;
        var object = { name: this.message, ischecked: false };
        arr.push(object);
        this.inputArrs = arr;
        this.setLeftNum();
        this.message = "";
        this.isshow = true;
      }
    },
    setLeftNum: function() {
      var length = 0;
      for (var i = 0; i < this.inputArrs.length; i++) {
        if (this.inputArrs[i].ischecked == false) length++;
      }
      this.itemsLeftNum = length;
    },
    deleteItem: function(index) {
      this.inputArrs.splice(index, 1);
      this.setLeftNum();

      this.isshow = this.inputArrs.length;
    }
  }
};
</script>

<style>
.main {
  margin-top: 15px;
  height: 120px;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.bottomView {
  font-size: 15px;
  width: 30%;
  height: 50px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.title {
  font-size: 30px;
  font-weight: bold;
}
.input {
  left: 35%;
  top: 0;
  width: 30%;
  line-height: 40px;
}
.itemList {
  width: 30%;
}
.item {
  margin: 5px 0;
  height: 30px;
  border-bottom: 1px solid lightgray; /*下边框线*/
}
.inputButton {
  width: 90%;
  border: none;
  outline: none;
  text-align: left;
}
.item-complete {
  text-decoration: line-through;
  color: gray;
}

.delete {
  float: right;
  padding-right: 5px;
  display: none;
  cursor: pointer;
}
.item:hover .delete {
  color: red;
  display: inline-block;
}
</style>