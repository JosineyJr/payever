.PHONY: start-app destroy/start-app
start-app:
	@docker-compose up

destroy:
	@docker-compose down -v --rmi local

destroy/start-app: destroy start-env