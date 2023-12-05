window.onload = function() {
    // The server-side code should set the initial articleList
    let filteredArticles = <%= JSON.stringify(articleList) %>;

    function filterArticles() {
        console.log('Filtering articles...');
        // Add filtering logic based on search input, checkboxes, etc.
        const mathCheckbox = document.getElementById('mathCheckbox').checked;
        const artCheckbox = document.getElementById('artCheckbox').checked;
        const techCheckbox = document.getElementById('techCheckbox').checked;

        filteredArticles = <%= JSON.stringify(articleList) %>.filter(item => {
            const category = item.category.toLowerCase();
            console.log("filter data :",category)
            return (
                (mathCheckbox && category === 'mathematics') ||
                (artCheckbox && category === 'art') ||
                (techCheckbox && category === 'technology')
            );
        });

        // Call the displayArticles function to update the displayed content
        displayArticles(filteredArticles);
    }

    function displayArticles(articles) {
console.log('Displaying articles...');
const articleListContainer = document.getElementById('articleList');
articleListContainer.innerHTML = '';

articles.forEach(item => {
    const container = document.createElement('div');
    container.classList.add('container');

    const articleSubjectHeading = document.createElement('h3');
    articleSubjectHeading.textContent = `Article Subject: ${item.name}(${item.id})`;
    container.appendChild(articleSubjectHeading);

    item.article.forEach(article => {
        const articleNameHeading = document.createElement('h5');
        articleNameHeading.textContent = `Article name: ${article.name}(${article.id})`;
        container.appendChild(articleNameHeading);

        const typeParagraph = document.createElement('p');
        typeParagraph.textContent = `Type: ${article.type}`;
        container.appendChild(typeParagraph);

        const bornParagraph = document.createElement('p');
        bornParagraph.textContent = `Born: ${article.born}`;
        container.appendChild(bornParagraph);

        // Add other properties as needed

        // Add a line break for separation
        const lineBreak = document.createElement('hr');
        container.appendChild(lineBreak);
    });

    const moreDetailsButton = document.createElement('button');
    moreDetailsButton.textContent = 'More Details';
    moreDetailsButton.addEventListener('click', () => {
        // Handle the click event, you can redirect to a detailed page or show more information.
        // Example: window.location.href = `/oneArticle?id=${item.id}`;
    });
    container.appendChild(moreDetailsButton);

    // Add a line break for separation
    const lineBreak = document.createElement('hr');
    container.appendChild(lineBreak);

    articleListContainer.appendChild(container);
});
}


    // Initial display
    displayArticles(filteredArticles);
  };