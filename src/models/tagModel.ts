export default interface TagModel {
  id?;
  unit?;
  name?: string;
  type?: number;
  from?: TagModel[];
}
