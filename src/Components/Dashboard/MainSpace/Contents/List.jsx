import { useCallback, useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { DropdownArrowIcon } from "./Utils";
import StoryFrame from "./StoryFrame";
import httpGetStories from "../../../../API/HTTP/GetStories";

export default function List({
  title,
  workspaceIndex,
  folderIndex,
  listIndex,
}) {
  const { workspaces } = useContext(WorkspaceContext);
  const [isListOpen, setIsListOpen] = useState(true);
  const [isStoryFetched, setIsStoryFetched] = useState(false);

  const [sortedStories, setSortedStories] = useState({
    todo: [],
    inProgress: [],
    inReview: [],
    inEvaluation: [],
    done: [],
  });

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
      .stories = await httpGetStories(
        [workspaces[workspaceIndex].uuid],
        [workspaces[workspaceIndex].folders[folderIndex].lists[listIndex].uuid],
      );

    workspaces[workspaceIndex]
      .folders[folderIndex]
      .lists[listIndex]
      .stories
      .map((story, index) => ({
        ...story,
        index: index,
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

    setIsStoryFetched(true);
  };

  const fetchStoriesCallback = useCallback(async () => {
    setIsListOpen(false);
    await fetchStories();
    setIsListOpen(true);
    setIsStoryFetched(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isListOpen && !isStoryFetched) fetchStoriesCallback();
  }, [isListOpen, isStoryFetched, fetchStoriesCallback]);

  useEffect(() => {
    fetchStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaces]);

  return (
    <div className="mb-3">
      <div
        className="d-flex align-items-center my-1 fw-bold" style={{ fontSize: "1.05em", cursor: "pointer" }}
        onClick={async () => setIsListOpen(!isListOpen)}
      >
        <DropdownArrowIcon isOpen={isListOpen} />
        <div className="mx-2"> {title} </div>
      </div>

      <div className={`${isListOpen ? "" : "d-none"} my-3`}>
        {
          sortedStories.done.length ?
            <StoryFrame
              title={"DONE"}
              stories={sortedStories.done}
              labelColor={"bg-success"}
              workspaceIndex={workspaceIndex}
              folderIndex={folderIndex}
              listIndex={listIndex}
              isStoryFetched={isStoryFetched}
              setIsStoryFetched={setIsStoryFetched}
            />
            :
            null
        }

        {
          sortedStories.inEvaluation.length ?
            <StoryFrame
              title={"IN EVALUATION"}
              stories={sortedStories.inEvaluation}
              labelColor={"bg-info"}
              workspaceIndex={workspaceIndex}
              folderIndex={folderIndex}
              listIndex={listIndex}
              isStoryFetched={isStoryFetched}
              setIsStoryFetched={setIsStoryFetched}
            />
            :
            null
        }

        {
          sortedStories.inReview.length ?
            <StoryFrame
              title={"IN REVIEW"}
              stories={sortedStories.inReview}
              labelColor={"bg-primary"}
              workspaceIndex={workspaceIndex}
              folderIndex={folderIndex}
              listIndex={listIndex}
              isStoryFetched={isStoryFetched}
              setIsStoryFetched={setIsStoryFetched}
            />
            :
            null
        }

        {
          sortedStories.inProgress.length ?
            <StoryFrame
              title={"IN PROGRESS"}
              stories={sortedStories.inProgress}
              labelColor={"bg-warning"}
              workspaceIndex={workspaceIndex}
              folderIndex={folderIndex}
              listIndex={listIndex}
              isStoryFetched={isStoryFetched}
              setIsStoryFetched={setIsStoryFetched}
            />
            :
            null
        }

        {
          sortedStories.todo.length ?
            <StoryFrame
              title={"TODO"}
              stories={sortedStories.todo}
              labelColor={"bg-secondary"}
              workspaceIndex={workspaceIndex}
              folderIndex={folderIndex}
              listIndex={listIndex}
              isStoryFetched={isStoryFetched}
              setIsStoryFetched={setIsStoryFetched}
            />
            :
            null
        }

        {
          !sortedStories.done.length
            && !sortedStories.inEvaluation.length
            && !sortedStories.inReview.length
            && !sortedStories.inProgress.length
            && !sortedStories.todo.length ?
            <StoryFrame
              title={"TODO"}
              stories={[]}
              labelColor={"bg-secondary"}
              workspaceIndex={workspaceIndex}
              folderIndex={folderIndex}
              listIndex={listIndex}
              isStoryFetched={isStoryFetched}
              setIsStoryFetched={setIsStoryFetched}
            />
            :
            null
        }
      </div>
    </div>
  );
}
