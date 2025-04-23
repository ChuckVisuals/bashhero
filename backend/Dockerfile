# Builds a simple Ubuntu image with basic tools for BashHero problems

FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
  nano \
  vim \
  bash

# Create a new user (e.g., "user") and set up the workspace
RUN useradd -ms /bin/bash user

# Switch to the new user
USER user

WORKDIR /workspace

CMD ["/bin/bash"]