
export const checkResponse = (res) => {
  if (res.ok)
    return res.json();

  return Promise.reject(`Возникла ошибка ${res.status}`);
}
