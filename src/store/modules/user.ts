import { defineStore } from "pinia";
import type { UserInfo } from "@/types/user";
import { login } from '@/api/login'
import { asyncRoutes, constantRoutes } from '@/router';


// 存放用户信息
// token userInfo userPermissions
interface UserState {
  token: string | null;
  userInfo: UserInfo;
  userPermissions: string[];
  userRoutes: string[];
}
export const getUserMenus = (userMenus:any) => {
  const menus = [...userMenus] // 备份（纯函数）
  _recursiveDeleteBtnPermission(menus)
  return menus
}
const _recursiveDeleteBtnPermission = (menus:any): void => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    // 目录
    if (menu.type === 1) {
      const children = menu?.children || []
      _recursiveDeleteBtnPermission(children) // 递归
      // 菜单
    } else if (menu.type === 2) {
      const children = menu?.children || []
      if (children?.length) {
        // 删除按钮权限数组
        delete menu.children
        menu.children = []
      }
    }
  }
}
export const userStore = defineStore({
  id:"user",
  state:():UserState => ({
    token:null,
    userInfo: null as any,
    userPermissions: [],
    userRoutes: [],
  }),
  getters:{
    // 获取用户token
    getToken:(state): string | null =>state.token,
    // 获取用户信息
    getUserInfo:(state): UserInfo =>state.userInfo,
    // 获取用户权限
    getUserPermissions:(state): string[] =>state.userPermissions,

    getUserRoutes:(state): string[] =>state.userRoutes
  },
  actions:{
    setToken(token:any){
      this.token = token;
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    setUserRoutes(userRoutes: any) {
      this.userRoutes = userRoutes
    },
    setUserPermission(permissions: any) {
      this.userPermissions = permissions
    },
    // user login 登录后获取到token 通过token获取用户信息和权限并渲染菜单
    // TODO 后续接口补充
    login() {
      this.setUserRoutes(constantRoutes)
    // const res = await login(params)
    // if(res.isSuccess){
    //   const { token } = res.getData()
    //   this.setToken(token)
    // }
  },
  }
})
