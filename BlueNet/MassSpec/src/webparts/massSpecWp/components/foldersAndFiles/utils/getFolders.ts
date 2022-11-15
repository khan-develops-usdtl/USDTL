export const getFolders = async (path, sp) => {
  const foldersRes = await sp.web
    .getFolderByServerRelativePath(path)
    .folders();
  const folders = foldersRes
    .map((folderRes) => ({
      ...folderRes,
      Name: folderRes.Name,
      isOpen: false,
      ServerRelativeUrl: folderRes.ServerRelativeUrl,
      TimeCreated: folderRes.TimeCreated,
    }))
    .sort((a, b) => a.Name.localeCompare(b.Name))
    .filter((folder) => folder.Name !== "Forms");
  return folders
};