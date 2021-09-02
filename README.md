## About

Base Code for FondoMaria 2021 website. It's drupal 9 Based and uses our M3 recipe.

### What is included

- Composer recipe and folder structure for **Drupal 9 recommended project**
- Configuration in composer recipe to load **M-III** dependencies and configurations.
- DDev recipe to start the project with **DDev+Docker**.
- Personatlization layer for Fondo Maria theming and settings

### What is recommended to have in your dev envirotment

- Docker service
- DDev-Local tools

### Getting started

- After cloning this repository run `ddev start` to create the containers required for the project and execute the configured post-start steps.
- Run `ddev composer install`.
- Import the current DB for Fondo Maria 2021 website.