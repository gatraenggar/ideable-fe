import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { DropdownArrowIcon } from "./Utils";
import StoryStatus from "./StoryStatus";
import httpGetStories from "../../../../API/HTTP/GetStories";

export default function List({ title, workspaceIndex, folderIndex, listIndex }) {
  const { workspaces } = useContext(WorkspaceContext);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isStoriesFetched, setIsStoriesFetched] = useState(false);

  const [sortedStories, setSortedStories] = useState({
    todo: [],
    inProgress: [],
    inReview: [],
    inEvaluation: [],
    done: [],
  });

  useEffect(() => {
    // fetchStories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStories = async (workspaceIDs, listIDs) => {
    const httpResponse = await httpGetStories(workspaceIDs, listIDs);
    const responseJSON = await httpResponse.json();

    if (responseJSON.status === "failed") throw new Error(responseJSON.message);

    return responseJSON.data;
  };

  const fetchStories = async () => {
    const storiesMap = {
      todo: [],
      inProgress: [],
      inReview: [],
      inEvaluation: [],
      done: [],
    };

    workspaces[workspaceIndex]
      .folders[folderIndex]
      .lists[listIndex]
      .stories = await getStories(
        [workspaces[workspaceIndex].uuid],
        [workspaces[workspaceIndex].folders[folderIndex].lists[listIndex].uuid],
      );

    console.log("new", workspaces[workspaceIndex]
      .folders[folderIndex]
      .lists[listIndex]
    );

    workspaces[workspaceIndex]
      .folders[folderIndex]
      .lists[listIndex]
      .stories
      .map((story) => ({
        ...story,
        tasks: [],
      }))
      .forEach((story) => {
        switch (story.status) {
          case 1:
            storiesMap.todo.push(story);
            break;
          case 2:
            storiesMap.inProgress.push(story);
            break;
          case 3:
            storiesMap.inReview.push(story);
            break;
          case 4:
            storiesMap.inEvaluation.push(story);
            break;
          case 5:
            storiesMap.done.push(story);
            break;
          default:
            break;
        }
      });

    setSortedStories({
      todo: storiesMap.todo,
      inProgress: storiesMap.inProgress,
      inReview: storiesMap.inReview,
      inEvaluation: storiesMap.inEvaluation,
      done: storiesMap.done,
    });
  };

  const showList = async () => {
    if (!isStoriesFetched) {
      await fetchStories();
      setIsStoriesFetched(true);
    }
    setIsListOpen(!isListOpen);
  };

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center my-1 fw-bold" style={{ fontSize: "1.05em", cursor: "pointer" }} onClick={async () => await showList()}>
        <DropdownArrowIcon isOpen={isListOpen} />
        <div className="mx-2"> {title} </div>
      </div>

      <div className={`${isListOpen ? "" : "d-none"} my-3`}>
        {
          sortedStories.done.length ?
            <StoryStatus title={"DONE"} stories={sortedStories.done} labelColor={"bg-success"} />
            :
            null
        }


        {
          sortedStories.inEvaluation.length ?
            <StoryStatus title={"IN EVALUATION"} stories={sortedStories.inEvaluation} labelColor={"bg-info"} />
            :
            null
        }

        {
          sortedStories.inReview.length ?
            <StoryStatus title={"IN REVIEW"} stories={sortedStories.inReview} labelColor={"bg-primary"} />
            :
            null
        }

        {
          sortedStories.inProgress.length ?
            <StoryStatus title={"IN PROGRESS"} stories={sortedStories.inProgress} labelColor={"bg-warning"} />
            :
            null
        }

        {
          sortedStories.todo.length ?
            <StoryStatus title={"TODO"} stories={sortedStories.todo} labelColor={"bg-secondary"} />
            :
            null
        }
        
        {
          !sortedStories.done.length
          && !sortedStories.inEvaluation.length
          && !sortedStories.inReview.length
          && !sortedStories.inProgress.length
          && !sortedStories.todo.length ?
            <StoryStatus title={"TODO"} stories={[]} labelColor={"bg-secondary"} />
            :
            null
        }
      </div>
    </div>
  );
}
