import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import SupporterList from "../components/common/SupporterList";
import SupporterContainer from "../components/common/SupporterContainer";
import Slider from "../components/slider";

const About = () => {
  return (
    <div className="flex flex-col gap-5">
      <Card className="bg-kaika-black">
        <CardHeader variant="gradient" color="orange" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            About Us
          </Typography>
        </CardHeader>
        <CardBody className=" px-6 pt-0 pb-2  h-full">
          <Typography
            variant="h2"
            color="orange"
            className="inline-block pb-2 mb-2 border-b-2 border-kaika-yellow"
          >
            About MainBrain
          </Typography>
          <div className="flex flex-col gap-6">
            <Typography className="text-gray-300 leading-8">
              MainBrain was founded in 2019 with a dedicated focus on advancing
              the fields of artificial intelligence and neuroscience. Our team,
              led by the visionary Hossein Sanaei, is committed to developing
              intelligent devices that can significantly improve people's lives.
              <br />
              <br />
              Our mission is to create a revolution in the world of artificial
              intelligence by leveraging the latest advancements in neuroscience
              and AI. We believe that with the right application of technology,
              we can unlock limitless possibilities, and help individuals and
              businesses achieve their full potential.
              <br />
              <br />
              MainBrain, we believe in constantly striving for betterment, and
              in leveraging our knowledge and expertise to improve the quality
              of life for people everywhere. We aim to achieve our goal of a
              limitless life by developing cutting-edge AI and neuroscience
              tools that are easy-to-use, hassle-free, and, most importantly,
              impactful.
              <br />
              <br />
              social responsibility is to make the world a better place by using
              technology to improve the quality of life for all. We believe that
              technology should be a force for good and have a positive impact
              on society. That's why we are committed to using the latest
              advancements in AI and neuroscience to create products and
              services that are not only innovative but also accessible to
              everyone.
              <br />
              <br />
              Join us on our journey to revolutionize the world of AI and
              neuroscience. Explore our range of products and services, and
              experience the power of our technology in action. We are excited
              to welcome you to the MainBrain community and work together
              towards a limitless future.
            </Typography>

            <div className="w-full  relative pt-12 pb-6 mx-auto my-12 border border-kaika-yellow rounded-lg px-3">
              <div className="absolute -top-8 left-1/2 lg:px-10 px-2 py-4 bg-kaika-yellow rounded-lg shadow-lg shadow-orange-500/40 -translate-x-1/2">
                <Typography variant="h6" color="white">
                  Our Supporters
                </Typography>
              </div>
              <div className=" relative flex overflow-x-hidden">
                <Slider />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default About;
