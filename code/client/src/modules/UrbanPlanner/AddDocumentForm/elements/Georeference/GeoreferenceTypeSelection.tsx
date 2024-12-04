import { Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../../../style.css";
import { Props } from "../../interfaces/types";
import NewPointSelection from "./elements/NewPointSelection";
import NewAreaSelection from "./elements/NewAreaSelection";
import ListOfPointsSelection from "./elements/ListOfPointsSelection";
import ListOfAreasSelection from "./elements/ListOfAreasSelection";

const GeoreferenceTypeSelection = (props: Props) => {
  const [geoType, setGeoType] = useState("Default");
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [showPolygonMap, setShowPolygonMap] = useState(false); // Stato per il modal del poligono

  useEffect(() => {
    if (geoType === "Default") {
      props.setDocument({
        ...props.document,
        georeference: null,
      });
    }
  }, [geoType]);

  const handleGeoSelection = (value: string) => {
    setGeoType(value);
    if (value === "NewPoint" || value === "ListOfPoints") {
      setShowMiniMap(true);
    } else if (value === "NewArea" || value === "ListOfAreas") {
      setShowPolygonMap(true);
    }
  };

  const handleDeselect = () => {
    setGeoType("Default");
  };

  return (
    <>
      <Form.Group as={Col} controlId="formGridGeoType">
        <Form.Label className="black-text">Georeference</Form.Label>
        {/* Choose between Point and Area */}
        {geoType === "Default" ? (
          <Row>
            <Col xs="auto">
              <Form.Check
                type="radio"
                id="georeference-point"
                label="Point"
                name="georeference"
                value="Point"
                onChange={(e) => handleGeoSelection(e.target.value)}
                className="font-size-20"
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="radio"
                id="georeference-polygon"
                label="Area"
                name="georeference"
                value="Polygon"
                onChange={(e) => handleGeoSelection(e.target.value)}
                className="font-size-20"
              />
            </Col>
          </Row>
        ) : (
          <></>
        )}
        {/* Point options */}
        {geoType === "Point" && (
          <Row>
            <Col xs="auto">
              <Form.Check
                type="radio"
                id="new-point"
                label="New point"
                name="georeference"
                value="NewPoint"
                onChange={(e) => handleGeoSelection(e.target.value)}
                className="font-size-20"
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="radio"
                id="list-points"
                label="List of points"
                name="georeference"
                value="ListOfPoints"
                onChange={(e) => handleGeoSelection(e.target.value)}
                className="font-size-20"
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                onClick={handleDeselect}
                className="button-small mt-2"
              >
                Deselect
              </Button>
            </Col>
          </Row>
        )}
        {/* Area options */}
        {geoType === "Polygon" && (
          <Row>
            <Col xs="auto">
              <Form.Check
                type="radio"
                id="new-area"
                label="New area"
                name="georeference"
                value="NewArea"
                onChange={(e) => handleGeoSelection(e.target.value)}
                className="font-size-20"
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="radio"
                id="list-areas"
                label="List of areas"
                name="georeference"
                value="ListOfAreas"
                onChange={(e) => handleGeoSelection(e.target.value)}
                className="font-size-20"
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="radio"
                id="municipality"
                label="Municipality Area"
                name="georeference"
                value="Municipality"
                onChange={(e) => handleGeoSelection(e.target.value)}
                className="font-size-20"
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                onClick={handleDeselect}
                className="button-small mt-2"
              >
                Deselect
              </Button>
            </Col>
          </Row>
        )}

        {geoType === "NewPoint" && (
          <Row>
            <Col>
              <NewPointSelection
                {...props}
                showMiniMap={showMiniMap}
                setShowMiniMap={setShowMiniMap}
              />
              <Button
                variant="primary"
                onClick={handleDeselect}
                className="button-small mt-2"
              >
                Deselect
              </Button>
            </Col>
          </Row>
        )}
        {geoType === "NewArea" && (
          <Row>
            <Col>
              <NewAreaSelection
                {...props}
                showPolygonMap={showPolygonMap}
                setShowPolygonMap={setShowPolygonMap}
              />
              <Button
                variant="primary"
                onClick={handleDeselect}
                className="button-small mt-2"
              >
                Deselect
              </Button>
            </Col>
          </Row>
        )}
        {geoType === "ListOfPoints" && (
          <Row>
            <Col>
              <ListOfPointsSelection
                {...props}
                showMiniMap={showMiniMap}
                setShowMiniMap={setShowMiniMap}
              />
              <Button
                variant="primary"
                onClick={handleDeselect}
                className="button-small mt-2"
              >
                Deselect
              </Button>
            </Col>
          </Row>
        )}
        {geoType === "ListOfAreas" && (
          <Row>
            <Col>
              <ListOfAreasSelection
                {...props}
                showPolygonMap={showPolygonMap}
                setShowPolygonMap={setShowPolygonMap}
              />
              <Button
                variant="primary"
                onClick={handleDeselect}
                className="button-small mt-2"
              >
                Deselect
              </Button>
            </Col>
          </Row>
        )}
        {geoType === "Municipality" && (
          <Row>
            <Col>
              <p className="text-success">Municipality area selected</p>
              <Button
                variant="primary"
                onClick={handleDeselect}
                className="button-small mt-2"
              >
                Deselect
              </Button>
            </Col>
          </Row>
        )}
      </Form.Group>
    </>
  );
};

export default GeoreferenceTypeSelection;
