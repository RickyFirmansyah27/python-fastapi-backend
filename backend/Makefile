# Python Environment
PYTHON=py
PIP=pip

# Paths
VENV_DIR=venv

# Install dependencies
install:
	$(PYTHON) -m venv $(VENV_DIR)
	$(VENV_DIR)/Scripts/$(PIP) install -r requirements.txt

# Run Fastapi server
run:
	$(VENV_DIR)/Scripts/uvicorn main:app --host 0.0.0.0 --port 8000

# Clean up pyc files
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

# Show help
help:
	@echo "Makefile for Fastapi service"
	@echo "Usage:"
	@echo "  make install        - Install dependencies"
	@echo "  make run            - Run Fastapi development server"
	@echo "  make clean          - Clean up pyc files"
