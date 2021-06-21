export interface PackageNode{
  id: string;
  name: string;
  children?: PackageNode[];
}
