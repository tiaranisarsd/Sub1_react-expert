import PropTypes from "prop-types";
import {  FaThumbsDown, FaThumbsUp, FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils/index";
import parse from "html-react-parser";
import { useState } from "react";

export default function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  const [upVoteIsActive, setUpVoteSetActive] = useState(upVotesBy.includes(authUserId));
  const [downVoteIsActive, setDownVoteSetActive] = useState(downVotesBy.includes(authUserId));
  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  const onUpvoteHandleClick = (e) => {
    e.stopPropagation(); 
    if (upVotesBy.includes(authUserId)) {
      neutralizeVote(id);
      setUpVoteSetActive(false);
    } else {
      upVote(id);
      setUpVoteSetActive(true);
      setDownVoteSetActive(false);
    }
  };

  const onDownvoteHandleClick = (e) => {
    e.stopPropagation();
    if (downVotesBy.includes(authUserId)) {
      neutralizeVote(id);
      setDownVoteSetActive(false);
    } else {
      downVote(id);
      setDownVoteSetActive(true);
      setUpVoteSetActive(false);
    }
  };

  return (
    <div
      className="card mb-3 bg-light shadow-sm"
      style={{ cursor: "pointer", backgroundColor: "#f2f4f8" }}
      onClick={onThreadClick}
    >
      <div className="card-header bg-blue2 d-flex justify-content-between align-items-center">
        <span className="badge bg-blue text-white">#{category}</span>
        <small>{postedAt(createdAt)}</small>
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="card-text text-body-secondary" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
          {parse(body)}
        </div>
      </div>
      <div className="card-footer bg-blue2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-1">
        <button
          className={`btn btn-sm d-flex align-items-center gap-1 ${upVoteIsActive ? "btn-success" : "btn-outline-success"}`}
          onClick={onUpvoteHandleClick}
        >
          <FaThumbsUp /> <span>{upVotesBy.length}</span>
        </button>
        <button
          className={`btn btn-sm d-flex align-items-center gap-1 ${downVoteIsActive ? "btn-danger" : "btn-outline-danger"}`}
          onClick={onDownvoteHandleClick}
        >
          <FaThumbsDown /> <span>{downVotesBy.length}</span>
        </button>
          <FaRegComment className="text-blue text-hover ms-3" />
          <span className="ps-1">{totalComments}</span>
        </div>
        <small>
          Dibuat oleh <strong>{user.name}</strong>
        </small>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadsItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

ThreadItem.propTypes = {
  ...threadsItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export { threadsItemShape };
