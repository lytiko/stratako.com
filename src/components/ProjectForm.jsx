import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { TwitterPicker } from "react-color";
import Modal from "../components/Modal";
import { CREATE_PROJECT, UPDATE_PROJECT } from "../mutations";
import Button from "./Button";
import { createErrorObject } from "../forms";
import { PROJECT, PROJECTS } from "../queries";

const ProjectForm = props => {

  const { project, showFormModal, setShowFormModal, projectCategories } = props;
  const [name, setName] = useState(project ? project.name : "");
  const [description, setDescription] = useState(project ? project.description : "");
  const [category, setCategory] = useState(project ? (project.category || "") : "");
  const [color, setColor] = useState(project ? project.color : "#111111");
  const [status, setStatus] = useState(project ? project.status : 1);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const categories = projectCategories.map(
    category => ({label: category.name, value: category.name})
  )

  const statuses = [
    {value: 1, label: "Active"}, {value: 2, label: "Maintenance"},
    {value: 3, label: "On Hold"}, {value: 4, label: "Not Started"},
    {value: 5, label: "Completed"}, {value: 6, label: "Abandoned"}
  ]

  const colors = [
    "#00a8ff", "#8c7ae6", "#e84118", "#e1b12c", "#718093", "#44bd32", "#2f3640",
    "#ff9ff3", "#ff9f43", "#48dbfb", "#b71540", "#b8e994", "#fff200", "#d1ccc0"
  ]

  const [createProject, createProjectMutation] = useMutation(CREATE_PROJECT, {
    onCompleted: data => history.push(`/projects/${data.createProject.project.id}/`),
    refetchQueries: [{query: PROJECTS}],
    onError: ({graphQLErrors}) => {
      setErrors(createErrorObject(errors, graphQLErrors))
    }
  });

  const [updateProject, updateProjectMutation] = useMutation(UPDATE_PROJECT, {
    onCompleted: () => setShowFormModal(false),
    refetchQueries: [
      {query: PROJECT, variables: {id: project ? project.id : null}},
      {query: PROJECTS},
    ],
    awaitRefetchQueries: true,
    onError: ({graphQLErrors}) => {
      setErrors(createErrorObject(errors, graphQLErrors))
    }
  });

  const formSubmit = e => {
    e.preventDefault();
    if (project) {
      updateProject({variables: {id: project.id, name, description, color, status, category}});
    } else {
      createProject({variables: {name, description, color, status, category}});
    }
  }

  return (
    <Modal showModal={showFormModal} setShowModal={setShowFormModal}>
      <form className="project-form" onSubmit={formSubmit}>
        <div className="input">
          <label htmlFor="name">What is the Project called?</label>
          {errors.name && <div className="error">{errors.name}</div>}
          <input
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="input">
          <label htmlFor="description">Describe the project. What is its aim? What are its completion conditions?</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="bottom-row">
        <div className="input category">
          <label htmlFor="description">What category does it belong to, if any?</label>
            <Creatable
              options={categories}
              isClearable={true}
              value={categories.filter(c => c.value === category)[0] || {label: category, value: category}}
              onChange={e => setCategory(e ? e.value : "")}
              placeholder=""
              backspaceRemovesValue={true}
              className="select"
              classNamePrefix="select"
            />
        </div>

          <div className="input">
            <label>What is its initial status?</label>
            <Select
              options={statuses}
              value={statuses.filter(s => s.value === status)[0]}
              onChange={e => setStatus(e.value)}
              className="select"
              classNamePrefix="select"
            />
          </div>
          
        </div>
          <div className="input">
            <label htmlFor="color">What color should it use? <span style={{backgroundColor: color}} /></label>
            <TwitterPicker
              color={color} onChange={c => setColor(c.hex)} triangle="hide"
              colors={colors} width={`324px`}
            />
          </div>
        <Button loading={createProjectMutation.loading || updateProjectMutation.loading}>
          {project ? "Save" : "Create Project"}
        </Button>
      </form>
    </Modal>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.object,
  showFormModal: PropTypes.bool.isRequired,
  setShowFormModal: PropTypes.func.isRequired,
};

export default ProjectForm;