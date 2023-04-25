import logo from "../../public/assets/image/logo-caica.png";
import caicaImg from "../../public/assets/image/Header-top.svg";
import caicaImg1 from "../../public/assets/image/mission2.svg";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const About = () => {
  return (
    <div className="mt-12 flex flex-col gap-5">
      <Card className="bg-kaika-black">
        <CardHeader variant="gradient" color="orange" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            About Us
          </Typography>
        </CardHeader>
        <CardBody className=" px-6 pt-0 pb-2 overflow-y-scroll h-[31rem]">
          <Typography variant="h2" color="orange">
            Who are we?
          </Typography>
          <div className="flex flex-col md:flex-row gap-6">
            <Typography className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ab,
              obcaecati doloribus possimus perspiciatis impedit rerum
              reiciendis. Laudantium consectetur nulla, temporibus repellendus
              natus, maiores, ab consequatur harum architecto veniam esse! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Hic ab,
              obcaecati doloribus possimus perspiciatis impedit rerum
              reiciendis. Laudantium consectetur nulla, temporibus repellendus
              natus, maiores, ab consequatur harum architecto veniam esse!
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              architecto tenetur alias reprehenderit dolor, explicabo est
              aperiam voluptatum perferendis possimus consequuntur quaerat
              beatae quo asperiores distinctio temporibus expedita optio
              suscipit?
            </Typography>
            <img
              src={logo}
              className="animate-pulse w-72 border border-kaika-yellow rounded-full hover:shadow-sm hover:shadow-kaika-yellow"
            />
          </div>
          <div className="flex gap-5 mt-6">
            <img
              src={caicaImg}
              className="animate-pulse w-72 border border-kaika-yellow rounded-full hover:shadow-sm hover:shadow-kaika-yellow"
            />
            <div className="flex flex-col">
              <Typography variant="h3" color="orange">
                Who are we?
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ab,
                obcaecati doloribus possimus perspiciatis impedit rerum
                reiciendis. Laudantium consectetur nulla, temporibus repellendus
                natus, maiores, ab consequatur harum architecto veniam esse!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ab,
                obcaecati doloribus possimus perspiciatis impedit rerum
                reiciendis. Laudantium consectetur nulla, temporibus repellendus
                natus, maiores, ab consequatur harum architecto veniam esse!
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                architecto tenetur alias reprehenderit dolor, explicabo est
                aperiam voluptatum perferendis possimus consequuntur quaerat
                beatae quo asperiores distinctio temporibus expedita optio
                suscipit?
              </Typography>
            </div>
          </div>
          <div className="mt-6">
            <Typography variant="h3" color="orange" className="text-center">
              What is my Goal ?
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              nemo temporibus molestiae est voluptatibus perspiciatis voluptas
              dolor in dolore, maiores autem, facere earum qui consequatur
              expedita officiis amet necessitatibus! Delectus! At quidem
              voluptatibus officiis porro, eius dolorem assumenda cupiditate id?
              Aspernatur architecto nesciunt quasi a facilis asperiores,
              eligendi molestiae sunt ut, deleniti, animi voluptas praesentium
              maiores esse porro qui quisquam. Incidunt culpa, tempore sunt
              consequatur fuga at! Doloremque dicta unde ipsam distinctio ea eum
              <br />
            </Typography>
            <Typography variant="h4" color="orange">
              This is a title
            </Typography>
            <Typography>
              tempora consequuntur quae ut, amet saepe nisi sapiente velit
              maiores ipsum officia totam cum, ullam nesciunt. Dolor, recusandae
              repellendus! Doloremque aut facere tenetur distinctio ipsa
              corrupti earum corporis dolore! Debitis totam hic fugit. Quo autem
              quod assumenda? Assumenda animi asperiores voluptatem obcaecati
              unde corporis aliquam totam. Ex assumenda minima magnam veritatis
              nisi, pariatur quam iste dolorem, est molestias ullam eius
              deleniti.
              <br /> Quidem ullam molestias rerum? Ratione molestias alias harum
              beatae recusandae necessitatibus atque placeat dolorum incidunt?
              Rem doloribus, blanditiis at nobis aspernatur fugiat repellat
              ipsam id architecto iste nihil laboriosam in accusamus
              necessitatibus delectus cum atque earum fuga sit ea mollitia
              dolores illum unde! Error, corrupti? Totam perspiciatis repellat
              accusantium ut aspernatur recusandae earum magnam, temporibus
              dicta, reprehenderit tenetur obcaecati? Assumenda, amet.
              Voluptates, suscipit soluta! Ipsam assumenda cupiditate
              distinctio, possimus aspernatur iste facere laborum cum! Fugiat.
            </Typography>
          </div>
          <div>
            <img
              src={caicaImg1}
              className="animate-pulse w-96 h-96 mx-auto p-2 my-4 rounded-full border border-kaika-yellow hover:shadow-sm hover:shadow-kaika-yellow"
            />
          </div>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil ad
            tenetur est, temporibus delectus aspernatur placeat labore beatae
            neque blanditiis eligendi asperiores rem amet ducimus magnam harum
            suscipit natus deleniti. Alias enim voluptate, temporibus, quod
            natus, culpa atque quaerat veniam unde consequuntur voluptas velit?
            Magni velit laudantium, ipsam placeat laboriosam natus aliquid
            repudiandae! Molestias quaerat, nulla tempora explicabo rem facilis.
            Quos velit autem deleniti aliquid? Aliquid mollitia nobis atque non
            repellat. Repudiandae, eligendi quas atque voluptates quae
            necessitatibus ipsam, fuga, tempora ipsum eos nulla neque
            consequatur sint nisi porro animi? Natus praesentium possimus non
            voluptatibus eligendi, nemo commodi tempora dolorum asperiores saepe
            vel et ullam aspernatur, inventore doloribus adipisci accusamus
            eaque in quaerat exercitationem? Sapiente commodi nesciunt
            perferendis illum repudiandae! Quaerat aspernatur, commodi assumenda
            deserunt doloribus a est eligendi neque at repudiandae amet dolor
            non quod tenetur ullam cupiditate consequuntur numquam dolorem iusto
            ut consectetur vero! Quasi facilis laboriosam totam!
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default About;
