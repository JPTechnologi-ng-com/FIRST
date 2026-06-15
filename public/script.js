const apiBase = "/api";

async function fetchPosts() {
  try {
    const response = await fetch(`${apiBase}/posts`);
    if (!response.ok) {
      throw new Error("Could not load posts");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderPostCards(posts, container) {
  if (!container) return;
  container.innerHTML = posts
    .map(
      (post) => `
        <article class="card post-card">
          <div class="post-meta">
            <span>${post.category}</span>
            <span>${post.date}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.summary}</p>
          <div class="post-meta">
            ${post.tags.map((tag) => `<span class="tag-pill">${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderHomePosts(posts) {
  const homePosts = posts.slice(0, 2);
  const homeContainer = document.getElementById("home-posts");
  renderPostCards(homePosts, homeContainer);
}

function renderBlogPosts(posts, category) {
  const filteredPosts = category && category !== "All"
    ? posts.filter((post) => post.category === category || post.tags.includes(category))
    : posts;
  const postsGrid = document.getElementById("posts-grid");
  renderPostCards(filteredPosts, postsGrid);
}

function renderCategoryFilters(categories) {
  const filters = ["All", ...categories];
  const filterContainer = document.getElementById("category-filters");
  if (!filterContainer) return;

  filterContainer.innerHTML = filters
    .map(
      (category, index) => `
        <button class="filter-chip${index === 0 ? " active" : ""}" type="button" data-category="${category}">${category}</button>
      `
    )
    .join("");

  filterContainer.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      filterContainer.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderBlogPosts(window.__sitePosts || [], button.dataset.category);
    });
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const statusMessage = document.getElementById("contact-status");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusMessage.textContent = "Sending...";

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const response = await fetch(`${apiBase}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      statusMessage.textContent = result.message;
      form.reset();
    } catch (error) {
      const fallbackMessage = "Failed to send message. Make sure the site is loaded over http://localhost:3000 and the server is running.";
      statusMessage.textContent = error.message === "Failed to fetch" ? fallbackMessage : error.message;
      console.error(error);
    }
  });
}

async function init() {
  const posts = await fetchPosts();
  window.__sitePosts = posts;

  renderHomePosts(posts);

  const categories = [...new Set(posts.flatMap((post) => [post.category, ...post.tags]))];
  renderCategoryFilters(categories);
  renderBlogPosts(posts, "All");
  setupContactForm();
}

init();
