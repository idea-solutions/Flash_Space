import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SingleCard from "../Card/SingleCard";

const roomData = [
  {
    id: 1,
    imageurl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    name: "Phòng thu nhạc",
    price: "150.000",
    description: "Quận 8",
  },
  {
    id: 2,
    imageurl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    name: "Phòng thu nhạc",
    price: "150.000",
    description: "Quận 7",
  },
  {
    id: 3,
    imageurl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    name: "Phòng thu nhạc",
    price: "150.000",
    description: "Quận 8",
  },
  {
    id: 4,
    imageurl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    name: "Phòng thu nhạc",
    price: "150.000",
    description: "Quận 8",
  },
  {
    id: 5,
    imageurl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    name: "Phòng thu nhạc",
    price: "150.000",
    description: "Quận 8",
  },
  {
    id: 6,
    imageurl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    name: "Phòng thu nhạc",
    price: "150.000",
    description: "Quận 8",
  },
  {
    id: 7,
    imageurl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    name: "Phòng thu nhạc",
    price: "150.000",
    description: "Quận 8",
  },
  {
    id: 8,
    imageurl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    name: "Phòng thu nhạc",
    price: "150.000",
    description: "Quận 8",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const room = roomData.map((item) => (
  <SingleCard
    name={item.name}
    url={item.imageurl}
    price={item.price}
    description={item.description}
  />
));

const CarouselsCard = (props) => {
  return (
    <div className="mt-3 mb-3">
      <blockquote class="text-center">
        <p class="mb-3">{props.title}</p>
        <footer class="blockquote-footer">
          {props.content} <cite title="Source Title">{props.note}</cite>
        </footer>
      </blockquote>
      <Carousel responsive={responsive}>{room}</Carousel>
    </div>
  );
};

export default CarouselsCard;
