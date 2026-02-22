let stories = JSON.parse(localStorage.getItem("stories")) || [];

function saveToLocal() {
    localStorage.setItem("stories", JSON.stringify(stories));
}

function addOrUpdateStory() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const category = document.getElementById("category").value;
    const editId = document.getElementById("editId").value;

    if (!title || !content) {
        alert("Fill all fields!");
        return;
    }

    if (editId) {
        stories = stories.map(story =>
            story.id == editId
                ? { ...story, title, content, category }
                : story
        );
        document.getElementById("editId").value = "";
    } else {
        stories.push({
            id: Date.now(),
            title,
            content,
            category,
            likes: 0
        });
    }

    saveToLocal();
    displayStories();
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

function displayStories(filtered = stories) {
    const storyList = document.getElementById("storyList");
    storyList.innerHTML = "";

    filtered.forEach(story => {
        storyList.innerHTML += `
            <div class="story-card">
                <h3>${story.title}</h3>
                <p>${story.content}</p>
                <small>${story.category}</small><br><br>
                <button onclick="likeStory(${story.id})">❤️ ${story.likes}</button>
                <button onclick="editStory(${story.id})">Edit</button>
                <button onclick="deleteStory(${story.id})">Delete</button>
            </div>
        `;
    });
}

function likeStory(id) {
    stories = stories.map(story => {
        if (story.id === id) story.likes++;
        return story;
    });
    saveToLocal();
    displayStories();
}

function deleteStory(id) {
    stories = stories.filter(story => story.id !== id);
    saveToLocal();
    displayStories();
}

function editStory(id) {
    const story = stories.find(s => s.id === id);
    document.getElementById("title").value = story.title;
    document.getElementById("content").value = story.content;
    document.getElementById("category").value = story.category;
    document.getElementById("editId").value = story.id;
}

function searchStories(keyword) {
    const filtered = stories.filter(story =>
        story.title.toLowerCase().includes(keyword.toLowerCase())
    );
    displayStories(filtered);
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

displayStories();