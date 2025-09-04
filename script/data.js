// const apikey='R2pVuh23NypBscl3dePjOR4Q5zaVlCbaU9Ofrez3uw4KFIcuylAec9zR'

const apikey = "OVCLdp2DD10xRwFRNjFLAtkezlxKDZPs";
export async function getImages() {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=technology&limit=15`;
  const res = await fetch(url);
  const { data } = await res.json();

  const newData = data.map((img, index) => {
    return {
      id: index,
      title: img.title,
      thumbnail: img.images.preview_gif.url,
      fullGift: img.images.original.url,
    };
  });

  return newData;
}
