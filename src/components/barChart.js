import React from "react";

const BarChart = ({comment, conversation, groupVotesForThisGroup}) => {

  const rectStartX = 70;
  const barHeight = 12;
  const leftTextOffset = 63;

  const arr = [
    {
      label: "voted",
      percent: comment.count / conversation.participant_count * 100,
      ratio: " (" + comment.count + "/" + conversation.participant_count + ")",
      fill: "rgb(180,180,180)"
    },
    {
      label: "agreed",
      percent: comment.agree_count / comment.count * 100,
      ratio: " (" + comment.agree_count + "/" + comment.count + ")",
      fill: "rgb(46, 204, 113)"
    },
    {
      label: "disagreed",
      percent: comment.disagree_count / comment.count * 100,
      ratio: " (" + comment.disagree_count + "/" + comment.count + ")",
      fill: "rgb(231, 76, 60)"
    },
    {
      label: "passed",
      percent: comment.pass_count / comment.count * 100,
      ratio: " (" + comment.pass_count + "/" + comment.count + ")",
      fill: "rgb(230,230,230)"
    }
  ];
  if (groupVotesForThisGroup) {
    let groupVotesForThisComment = groupVotesForThisGroup.votes[comment.tid];
    let agrees = groupVotesForThisComment.A;
    let disagrees = groupVotesForThisComment.D;
    let sawTheComment = groupVotesForThisComment.S;
    let passes = sawTheComment - (agrees + disagrees);
    let totalVotes = agrees + disagrees + passes;
    let nMembers = groupVotesForThisGroup["n-members"];
    arr[0].percent = totalVotes / nMembers * 100;
    arr[1].percent = agrees / totalVotes * 100;
    arr[2].percent = disagrees / totalVotes * 100;
    arr[3].percent = passes / totalVotes * 100;

    arr[0].ratio = " (" + totalVotes + "/" + nMembers + ")";
    arr[1].ratio = " (" + agrees     + "/" + totalVotes + ")";
    arr[2].ratio = " (" + disagrees  + "/" + totalVotes + ")";
    arr[3].ratio = " (" + passes     + "/" + totalVotes + ")";
  }

  return (
    <g>
      {arr.map((d, i) => {
        return (
          <g key={i}>
            <text x={leftTextOffset} y={(i+1) * 15} fontFamily="Helvetica" fontSize="10" textAnchor={"end"}>
              {d.label}
            </text>
            <rect
              width={d.percent}
              height={barHeight}
              x={rectStartX}
              y={((i+1) * 15) - 9}
              fill={d.fill}/>
            <text x={leftTextOffset + d.percent + 10} y={(i+1) * 15} fontFamily="Helvetica" fontSize="10" textAnchor={"start"}>
              {Math.floor(d.percent) + "%"}
              {d.ratio}
            </text>
          </g>
        )
      })}
    </g>
  )
};

export default BarChart;