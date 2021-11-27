import List from "./List"

export default function Folder({ workspaceTitle, workspaceFolders }) {
  return workspaceFolders.map(({ title: folderTitle, list: folderList }, index) => {
    return (
      <div key={index}>
        <div className="">
          {workspaceTitle} &gt; {folderTitle}
        </div>

        {
          folderList.map(({ title: listTitle, stories }, index) => {
            return (
              <div key={index} >
                <List title={listTitle} stories={stories} />
              </div>
            );
          })
        }
      </div>
    );
  });
}
