Feature: CWL-Airflow, DT_01 - No Conda +New Container with PostgreSQL
	As a user I want to work with CWL-Airflow on OS without conda and with new container with PostgreSQL

	Scenario Outline: The repository is cloned
		Given the <OS> was clear and worked correctly
		When the user runs the command in bash shell "git clone https://github.com/ForomePlatform/airflow-cwl-docker.git"
		Then The repository should be cloned

		Examples: 
		| OS     |
		| Centos |
		| Ubuntu |
		| MacOS  |

	Scenario: Open airflow-cwl-docker folder
		Given the repository was cloned
		When the user runs the command in bash shell "cd airflow-cwl-docker"
		Then The folder should be opened

	Scenario: Update submodule
		Given the airflow-cwl-docker was opened
		When the user runs the command in bash shell "git submodule update --init --recursive"
		Then The submodule should be set to be updated

	Scenario: Copy env_example_postgres_noconda
		Given the submodule was updated
		When the user runs the command in bash shell "cp .env_example_postgres_noconda .env"
		Then The file should be copied

	Scenario: Build container
		Given the .env_example_postgres_noconda folder was copied
		When the user runs the command in bash shell "DOCKER_BUILDKIT=1 BUILDKIT_PROGRESS=plain docker-compose --env-file ./.env build"
		Then The container should be build

	Scenario: Create new folder
		Given the container was built
		When the user runs the command in bash shell "mkdir -p ./dags && cp -rf ./project/examples/* ./dags"
		Then The folder should be created

	Scenario: Start the container
		Given the dags folder was created
		When the user runs the command in bash shell "docker-compose --env-file ./.env up -d"
		Then The container should be started successfully