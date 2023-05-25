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
            About MainBrain
          </Typography>
        </CardHeader>
        <CardBody className=" px-6 pt-0 pb-2  h-full">
          <div className="flex flex-col gap-6">
            <Typography className="text-gray-300 leading-8">
              In 2019, MainBrain started its pursuits by dint of AI and
              neuroscience, to express its products to people’ lives and
              businesses. From outset this company started its work with three
              personnel, and at the moment have twenty expert personnel in
              neuroscience, AI, electronics, marketing and other fields, from
              best universities of Iran and other countries around the world.
              <br />
              We do our best; to fulfill our social responsibility, which is
              enhancing your life quality, by means of modern technology.
              <br />
              With our great efforts and your synergy, we hope to reach
              limitless life.
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
