import type { IRoutes } from '../../app/routes';
import type { FormFiledsMeta } from './types';

export const homeRoute = "/" satisfies IRoutes;
export const fieldsMeta: FormFiledsMeta[]  = [{
    label:"Дата:",
    type:"date",
    name:"date"
  }, {
    name: "first_name",
    label:"Имя:",
    type:"text"
  },{
    name:"last_name",
    label:"Фамилия:",
    type:"text"
  }
]
