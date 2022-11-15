import { IFolder } from "../IRoot";

export const updateIsOpen = (folder: IFolder, folders: IFolder[]) => {
  const result = [
    ...folders.map((folderElement) => {
      if (folderElement.Name === folder.Name) {
        folderElement.isOpen = !folder.isOpen;
      }
      return folderElement;
    }),
  ];
  return result
};