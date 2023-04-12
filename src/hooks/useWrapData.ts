import { DataNode } from "../models";

export const useWrapData = (data: any) => {
  return new DataNode(data, []);
};
