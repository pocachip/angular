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
}
export interface iPortal {
  roots : iMenu[];
}
