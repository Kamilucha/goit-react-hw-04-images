
export async function fetchImg(name, page) {
  const searchParams = new URLSearchParams({
    key: '36788641-8cf00dcd24f2681e40d99dde8',
    q: name,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const URL = 'https://pixabay.com/api/';

  try {
    const response = await fetch(`${URL}?${searchParams.toString()}`);
      const data = await response.json();
      console.log(data)

      return data
  } catch (error) {
    console.log('Error fetching images:', error);
  }
}
