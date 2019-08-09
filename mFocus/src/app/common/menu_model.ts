export interface iMenu {
  id : string;
  label : string;
  child? : iMenu[];
}
export interface iCategory {
  id : string;
  level : number;
  label : string;
  p_id : string;
  icon?: string;
}
export interface iPortal {
  roots : iMenu[];
}

export interface iWebCompConfig {
   width : string;
   fontsize: string;
   textalign: string;
}