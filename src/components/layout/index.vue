<template>
    <el-container class="layout-container-demo" style="height: 100vh">
      <el-aside width="180px">
        <el-scrollbar>
          <el-menu 
            active-text-color="#ffd04b"
            background-color="#001529"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
          >
            <el-menu-item >
              <el-icon><Shop /></el-icon>
              <span>L O G O</span>
            </el-menu-item>
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Avatar /></el-icon>Users
              </template>
              <el-menu-item index="1-1">User Search</el-menu-item>
            </el-sub-menu>
            
            <el-sub-menu index="2">
              <template #title>
                <el-icon><icon-menu /></el-icon>Navigator Two
              </template>
              <el-menu-item-group>
                <template #title>Group 1</template>
                <el-menu-item index="2-1">Option 1</el-menu-item>
                <el-menu-item index="2-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="2-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="2-4">
                <template #title>Option 4</template>
                <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><setting /></el-icon>Navigator Three
              </template>
              <el-menu-item-group>
                <template #title>Group 1</template>
                <el-menu-item index="3-1">Option 1</el-menu-item>
                <el-menu-item index="3-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="3-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="3-4">
                <template #title>Option 4</template>
                <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
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
                  <el-dropdown-item>Quit</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>Admin</span>
          </div>
        </el-header>
        <div class="body-el">
          
        </div>
      </el-container>
    </el-container>
  </template>
  
  <script lang="ts" setup>
  import { ref,reactive } from 'vue'
  import { Menu as IconMenu, Avatar, Setting,Shop } from '@element-plus/icons-vue'
  
  
  </script>
  
  <style scoped>
  .body-el{
    padding: 12px;
    background-color: #ececec;
    height: 100%;
    overflow-y: scroll;
  }
  .layout-container-demo .el-header {
    position: relative;
  }
  .layout-container-demo .el-aside {
    color: #fff;;
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
  