<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![CC BY-NC 4.0][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Nagell/portfolio-nuxt">
    <img src="/docs/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Portfolio-Nuxt</h3>

  <p align="center">
    Nuxt and Supabase based portfolio website
    <br />
    <a href="./docs/DEVELOPMENT.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Nagell/portfolio-nuxt/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Nagell/portfolio-nuxt/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://dawidnitka.com)

Projects main goal it to try out a combination of Nuxt and Supabase and the features they both offer.  

The Admin Dashboard is built with SSR and CRUD operations are done on the server side.  
The landing pages / accessible parts on the other hand are utilizing Incremental Static Regeneration (ISR),  
which means that the data is fetched at build time and then served from the cache.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Nuxt][Nuxt]][Nuxt-url]
- [![Supabase][Supabase]][Supabase-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![ESLint][ESLint]][ESLint-url]
- [![Shadcn-vue][Shadcn-vue]][Shadcn-vue-url]
- [![Tailwind CSS][Tailwind CSS]][Tailwind CSS-url]
- [![Lucide][Lucide]][Lucide-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- yarn

  ```sh
  npm install yarn -g
  ```

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/Nagell/portfolio-nuxt.git
   ```

2. Install packages

   ```sh
   yarn install
   ```

3. Start Docker Desktop ([Official docs](https://supabase.com/docs/guides/local-development/cli/getting-started))  
   - For Windows: set on in the settings `Expose deamon on tcp://localhost:2375 without TLS`
   - For Mac: set on in the settings `Use Virtualization Framework`  

4. Download Supabase container

   ```sh
   yarn supabase start
   ```

   If supabase is not recognized you can force it by reinstalling the package

   ```sh
    yarn install supabase -D
    ```

5. Copy `.env.example` to `.env`  
   and fill in the Supabase credentials visible in the console when the container starts.

    ```sh
    SUPABASE_KEY=<YOUR_LOCAL_SUPABASE_KEY> #"anon key" from the console
    # the rest can initially stay as it is
    ```

6. Start the development server

   ```sh
   yarn run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

8. Change git remote url to avoid accidental pushes to base project

   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

To obtain the admin dashboard access, you need to create a new OAuth application on Github.  
More on this topic can be found in the [development docs](./docs/DEVELOPMENT.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add Supabase integration
- [x] Add Tailwind CSS integration
- [x] Add admin panel with authentication
- [x] Add server-side CRUD operations for projects
- [x] Add server-side CRUD operations for images
- [x] Add image optimization
- [x] Deploy to Vercel
- [x] Add CI/CD
- [x] Prepare dev and prod environments
- [x] Create and implement a design for:
  - [x] landing page
  - [x] login page
  - [x] admin panel
- [x] Add animations
- [x] Connect final domain to the main branch
- [x] Add license
- [x] Add meta tags
- [x] Improve a11y - [link](https://www.a11yproject.com/checklist/)
- [x] Add Legal Notice and Privacy Policy
- [ ] Add i18n
- [ ] Add Vitest and tests

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the CC BY-NC 4.0 License. See `LICENSE` for more information.

[![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Dawid Nitka - [Linkedin][linkedin-url]

Project Link: [https://github.com/Nagell/portfolio-nuxt](https://github.com/Nagell/portfolio-nuxt)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

- [Nuxt Supabase](https://supabase.nuxtjs.org/)
- [Nuxt Image](https://image.nuxt.com/)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg?style=for-the-badge
[license-url]: ./LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/dawidnitka
[product-screenshot]: /docs/screenshot.png

[Nuxt]: https://img.shields.io/badge/Nuxt-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white
[Nuxt-url]: https://nuxt.com/
[Supabase]: https://img.shields.io/badge/Supabase-000000?style=for-the-badge&logo=supabase&logoColor=white
[Supabase-url]: https://supabase.com/
[Tailwind CSS]: https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind CSS-url]: https://tailwindcss.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[ESLint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[Shadcn-vue]: https://img.shields.io/badge/Shadcn_vue-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white
[Shadcn-vue-url]: https://www.shadcn-vue.com/
[Lucide]: https://img.shields.io/badge/Lucide-f67373?style=for-the-badge&logo=lucide&logoColor=white
[Lucide-url]: https://lucide.dev/

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
[cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
