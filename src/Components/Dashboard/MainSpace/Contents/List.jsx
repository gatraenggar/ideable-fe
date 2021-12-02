import { useEffect, useState } from "react";
import { DropdownArrowIcon } from "./Utils";
import StoryStatus from "./StoryStatus";

export default function List({ title, stories }) {
  const [isListOpen, setIsListOpen] = useState(false);

  const [sortedStories, setSortedStories] = useState({
    todo: [],
    inProgress: [],
    inReview: [],
    inEvaluation: [],
    done: [],
  });

  useEffect(() => {
    const storiesMap = {
      todo: [],
      inProgress: [],
      inReview: [],
      inEvaluation: [],
      done: [],
    };

    stories.forEach((story) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center my-1 fw-bold" style={{ fontSize: "1.05em", cursor: "pointer" }} onClick={() => setIsListOpen(!isListOpen)}>
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
      </div>
    </div>
  );
}
