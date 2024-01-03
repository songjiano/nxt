<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="180px">
      <el-scrollbar>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#001529"
          class="el-menu-vertical-demo"
          default-active="/index"
          text-color="#fff"
          @select="menusSelect"
        >
          <el-menu-item>
            <el-icon></el-icon>
            <img 
            class="omgLog"
              src="@/assets/img/logo.jpg"
              width="260"
              alt=""
              srcset=""
            />
          </el-menu-item>
          <el-menu-item index="/index">
            <template #title>
              <el-icon><HomeFilled /></el-icon>Index
            </template>
          </el-menu-item>
          <el-menu-item
            v-for="item in curentRouters"
            :index="item.url"
            :key="item.id"
          >
            <template #title>
              <el-icon><component :is="item.icon"></component></el-icon
              >{{ item.label }}
            </template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Setting</el-dropdown-item>
                <el-dropdown-item @click="quit">Quit</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ userName }}</span>
        </div>
      </el-header>
      <div class="body-el">
        <slot></slot>
      </div>
    </el-container>
  </el-container>
</template>

<script setup>
import { shallowRef } from "vue";
import {
  Menu as IconMenu,
  Avatar,
  Setting,
  Briefcase,
  HomeFilled,
  HelpFilled,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const curentRouters = shallowRef([]);
const userName = shallowRef("");

const menusArr = [
  { id: "1", uri: "/userList", icons: Avatar, label: "User List" },
  { id: "2", uri: "/userDetail", icons: Setting, label: "User Search" },
  { id: "3", uri: "/admins", icons: Briefcase, label: "Admin" },
  { id: "4", uri: "/nameplat", icons: HelpFilled, label: "Merch Setting" },
  // { id: "5", uri: "/barcode", icons: HelpFilled, label: "Barcode" },
  { id: "6", uri: "/guild", icons: HelpFilled, label: "Mercator‘s Guild" },
  // { id: "7", uri: "/hall", icons: HelpFilled, label: "NXT City Hall" },
  { id: "8", uri: "/discount", icons: HelpFilled, label: "Merch Discount" },
  { id: "9", uri: "/prizeDraw", icons: HelpFilled, label: "Prize Draw" },
];
const menusSelect = (index) => {
  router.push({ path: index });
};
const filterId = (id) => {
  if (!id) return "";
  return menusArr.filter((item) => item.id * 1 === id)[0];
};
const getTokens = () => {
  const urls = localStorage.getItem("nxtToken") || "";
  if (!urls) return (curentRouters.value = []);
  const { account, menuPerms } = JSON.parse(urls);
  userName.value = account;

  const menus = menuPerms || [];
  curentRouters.value = menus.filter((tiems) => {
    const curentMurent = filterId(tiems.menuId);
    const filters = curentMurent && (tiems.type === "1" || tiems.type === "2");
    if (filters) {
      tiems.label = curentMurent.label;
      tiems.url = curentMurent.uri;
      tiems.icon = curentMurent.icons;
      return true;
    } else {
      return false;
    }
  });
  localStorage.setItem("nxtMenus", JSON.stringify([...curentRouters.value]));
};
getTokens();
const quit = () => {
  // localStorage.removeItem("nxtToken");
  router.push({ path: "/login" });
};
</script>

<style scoped>
.omgLog{
 width:80px
}
.body-el {
  padding: 12px;
  background-color: #ececec;
  height: 100%;
  overflow-y: scroll;
}
.layout-container-demo .el-header {
  position: relative;
}
.layout-container-demo .el-aside {
  color: #fff;
  background: #001529;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
