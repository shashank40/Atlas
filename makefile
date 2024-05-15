# Define variables
PID_FILE := .pids

# Define targets
.PHONY: all atlas-server atlas-web atlas-chat-service run clean

atlas-server:
	@echo "Starting Atlas Server at http://localhost:8000"
	(cd server && uvicorn main:app --reload & echo $$! >> $(PID_FILE))

atlas-web:
	@echo "Starting Atlas Web at http://localhost:5173"
	(cd web && npm run dev & echo $$! >> $(PID_FILE))

atlas-chat-service:
	@echo "Starting Atlas Chat Service at http://localhost:3000"
	(cd chat-service && npx ts-node src/app.ts & echo $$! >> $(PID_FILE))

run: atlas-server atlas-web atlas-chat-service
	@echo "All services started"
	@trap 'make clean' INT; \
	read -p "Press (ctrl/cmd + c) and then (return) to stop services..."; \
	make clean

clean:
	@echo "Stopping services"
	@while read line; do \
		kill $$line || true; \
	done < $(PID_FILE); \
	rm -f $(PID_FILE)
