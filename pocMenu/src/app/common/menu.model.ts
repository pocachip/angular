export interface iMenu {
  id : string;
  label : string;
  child? : iMenu[];
}

export interface iPortal {
  roots : iMenu[];
}
