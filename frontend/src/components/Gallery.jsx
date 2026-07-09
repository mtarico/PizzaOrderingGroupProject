// src/components/Gallery.jsx
import pizza1 from '../assets/pizza1.png';
import pizza2 from '../assets/pizza2.png';

function Gallery() {
  return (
    <section className="gallery">
      <img src={pizza1} alt="Pizza 1" />
      <img src={pizza2} alt="Pizza 2" />
    </section>
  );
}

export default Gallery;
