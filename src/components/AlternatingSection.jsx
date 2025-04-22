// components/AlternatingSection.jsx
import { motion } from "framer-motion";
import "./AlternatingSection.css";

const AlternatingSection = ({
  imageUrl,
  title,
  content,
  reverse = false,
  separatorVariant,
}) => {
  return (
    <>
      <div className={`section ${reverse ? "reverse" : ""}`}>
        <motion.div
          className="text-content"
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>{title}</h2>
          <p>{content}</p>
        </motion.div>

        <motion.div
          className="image-container"
          initial={{ opacity: 0, x: reverse ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <img src={imageUrl} alt={title} />
        </motion.div>
      </div>

      {separatorVariant && (
        <motion.div
          className={`separator ${separatorVariant}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}
    </>
  );
};

export default AlternatingSection;
