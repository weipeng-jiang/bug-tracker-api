CREATE TABLE priority
(
    priority_id bit(2) NOT NULL PRIMARY KEY,
    priority_type VARCHAR(8) NOT NULL CHECK(priority_type = 'low' OR priority_type = 'med' OR
            priority_type = 'high' OR priority_type = 'urgent'),
    priority_image_url VARCHAR(200) NOT NULL,
    UNIQUE (priority_id),
    UNIQUE (priority_type),
    UNIQUE (priority_image_url)
);

CREATE TABLE roles
(
    role_id SMALLINT NOT NULL PRIMARY KEY,
    role_title VARCHAR(17) NOT NULL,
    UNIQUE (role_id),
    UNIQUE (role_title)
);

CREATE TABLE users
(
    user_id SERIAL NOT NULL PRIMARY KEY,
    role_id SMALLINT REFERENCES roles (role_id),
    user_fName VARCHAR(35) NOT NULL,
    user_lName VARCHAR(35) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(35) NOT NULL,
    last_login TIMESTAMPTZ,
    UNIQUE (user_id),
    UNIQUE (email)
);

CREATE TABLE projects
(
    project_id SERIAL NOT NULL PRIMARY KEY,
    project_name VARCHAR(30) NOT NULL,
    description VARCHAR(3000),
    date_created TIMESTAMPTZ NOT NULL,
    user_id SERIAL REFERENCES users (user_id),--I am dropping this, this is not in the ERD and added project_lead as FK
    UNIQUE(project_id)
);

CREATE TABLE status
(
    status_id bit(1) NOT NULL PRIMARY KEY,
    status_name VARCHAR(6) NOT NULL CHECK(status_name = 'open' OR status_name = 'closed'),
    UNIQUE (status_id),
    UNIQUE (status_name)
);

CREATE TABLE issues
(
    issue_id SERIAL NOT NULL PRIMARY KEY,
    project_id SERIAL REFERENCES projects (project_id) NOT NULL,
    priority_id bit(2) REFERENCES priority (priority_id),
    user_id SERIAL REFERENCES users (user_id) NOT NULL,
    status_id bit(1) REFERENCES status (status_id) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(2000),
    report_date TIMESTAMPTZ NOT NULL,
    last_edit_date TIMESTAMPTZ,
    close_date TIMESTAMPTZ,
    UNIQUE(issue_id)
);

-- CREATE TABLE user_token
-- (
--     --Could be a different data type/ IDK if they are unique or not null
--     token_id UUID NOT NULL PRIMARY KEY,
--     user_id REFERENCES users (user_id),
--     ip_address VARCHAR(50),
--     browser_id VARCHAR(100),
--     time_issued TIMESTAMPTZ,
--     time_expires TIMESTAMPTZ
-- )

CREATE TABLE comments
(
    comment_id SERIAL NOT NULL PRIMARY KEY,
    issue_id SERIAL REFERENCES issues (issue_id) NOT NULL,
    user_id SERIAL REFERENCES users (user_id) NOT NULL,
    description VARCHAR(500) NOT NULL,
    comment_date TIMESTAMPTZ NOT NULL,
    edit_date TIMESTAMPTZ,
    UNIQUE (comment_id)
);

CREATE TABLE user_projects
(
    user_id SERIAL REFERENCES users (user_id) NOT NULL,
    project_id SERIAL REFERENCES projects (project_id) NOT NULL,
    user_assign_date TIMESTAMPTZ NOT NULL,
    user_exit_date TIMESTAMPTZ,
    UNIQUE(user_id, project_id)
);

ALTER TABLE user_projects ADD CONSTRAINT "user_projects_pkey" PRIMARY KEY (user_id, project_id);--dropped 

CREATE TABLE assignees
(
    user_id SERIAL REFERENCES users (user_id) NOT NULL,
    issue_id SERIAL REFERENCES issues (issue_id) NOT NULL,
    UNIQUE(user_id, issue_id)
);

ALTER TABLE assignees ADD CONSTRAINT "assignees_pkey" PRIMARY KEY (user_id, issue_id);