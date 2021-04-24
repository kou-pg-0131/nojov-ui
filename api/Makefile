tfinit:
	docker-compose run --rm --workdir /app/terraform/envs/dev infra terraform init
tfplan:
	docker-compose run --rm --workdir /app/terraform/envs/dev infra terraform plan
tfapply:
	docker-compose run --rm --workdir /app/terraform/envs/dev infra terraform apply

yarn:
	docker-compose run --rm app yarn install --check-files
info:
	docker-compose run --rm app yarn run info
deploy:
	docker-compose run --rm app yarn run deploy
