export const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));


export const getRecipes = async () => {

    // Simulate a slow API
    await delay(5000);

    const response = await fetch(
        "https://dummyjson.com/recipes"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();

    return data.recipes;
};