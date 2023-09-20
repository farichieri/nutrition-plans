import { FC } from "react";

interface DataProps {
  data: {
    [key: string]: any;
  };
  children?: any;
}

const StructuredData: FC<DataProps> = ({ data, children }) => {
  return (
    <script
      key="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;
