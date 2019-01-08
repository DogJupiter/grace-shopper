import React from 'react'

function ProjectDetails(props) {
  const id = props.match.params.id
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Project Title - {id}</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
            nesciunt obcaecati minima maiores iste sequi unde eum sapiente, esse
            quas suscipit molestias, vitae nemo dolorem modi reprehenderit
            adipisci. Quam, est!
          </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by Sabira</div>
          <div>3rd September</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
