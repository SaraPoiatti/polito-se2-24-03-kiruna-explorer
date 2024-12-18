import db from "../../../src/db/db";
import { Database } from "sqlite3";
import DocumentDAO from "../../../src/dao/documentDAO";

jest.mock("../../../src/db/db.ts");

describe("DocumentDAO unit tests", () => {
  describe("createDocument", () => {
    // KX1
    test("It should reolve new instance of document", async () => {
      const documentDAO = new DocumentDAO();

      const mockDBGetTypes = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { documentTypeId: 1 });
          return {} as Database;
        })
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { nodeTypeId: 1 });
          return {} as Database;
        });

      const mockSerialize = jest.spyOn(db, "serialize").mockImplementationOnce((fn) => {
        fn();
      });

      const mockDBbeginTransaction = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql) => {
          return {} as Database;
        });

      const mockDBGetDoc = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, callback) => {
          callback(null, { documentId: 1 });
          return {} as Database;
        })

      const mockDBRunDoc = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBGetStakeholder = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { stakeholderId: 1 });
          return {} as Database;
        })

      const mockDBRunStakeholder = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBRunCommit = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, callback) => {
          callback(null);
          return {} as Database;
        });

      const result = await documentDAO.createDocument(
        "doc-1",
        "doc-1",
        "Text",
        "Text",
        "Design document",
        ["LKAB"],
        "2024-11-06",
        "English",
        "1",
        null,
        null,
        null
      );
      expect(result.documentId).toBeDefined();
      expect(result.message).toBeDefined();
      expect(result.status).toBeDefined();
      mockDBGetTypes.mockRestore();
      mockDBbeginTransaction.mockRestore();
      mockDBGetDoc.mockRestore();
      mockDBRunDoc.mockRestore();
      mockDBGetStakeholder.mockRestore();
      mockDBRunStakeholder.mockRestore();
      mockDBRunCommit.mockRestore();
      mockSerialize.mockRestore();
    });

    // KX3
    test("It should reolve new instance of document", async () => {
      const documentDAO = new DocumentDAO();

      const mockDBGetTypes = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { documentTypeId: 1 });
          return {} as Database;
        })
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { nodeTypeId: 1 });
          return {} as Database;
        });

      const mockSerialize = jest.spyOn(db, "serialize").mockImplementationOnce((fn) => {
        fn();
      });

      const mockDBbeginTransaction = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql) => {
          return {} as Database;
        });

      const mockDBGetGeo = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, callback) => {
          callback(null, { georeferenceId: 1 });
          return {} as Database;
        })

      const mockDBRunGeo = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBGetDoc = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, callback) => {
          callback(null, { documentId: 1 });
          return {} as Database;
        })

      const mockDBRunDoc = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBGetStakeholder = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, { stakeholderId: 1 });
          return {} as Database;
        })

      const mockDBRunStakeholder = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

      const mockDBRunCommit = jest
        .spyOn(db, "run")
        .mockImplementationOnce((sql, callback) => {
          callback(null);
          return {} as Database;
        });

      const result = await documentDAO.createDocument(
        "doc-1",
        "doc-1",
        "Text",
        "Text",
        "Design document",
        ["LKAB"],
        "2024-11-06",
        "English",
        "1",
        ["1.1,1.1"],
        "test",
        "test"
      );
      expect(result.documentId).toBeDefined();
      expect(result.message).toBeDefined();
      expect(result.status).toBeDefined();
      mockDBGetTypes.mockRestore();
      mockDBbeginTransaction.mockRestore();
      mockDBGetGeo.mockRestore();
      mockDBRunGeo.mockRestore();
      mockDBGetDoc.mockRestore();
      mockDBRunDoc.mockRestore();
      mockDBGetStakeholder.mockRestore();
      mockDBRunStakeholder.mockRestore();
      mockDBRunCommit.mockRestore();
      mockSerialize.mockRestore();
    });
  });

  // KX7 (Add original resource)
  describe("uploadResource", () => {
    it("should throw an exception when no files provided", async () => {
      const firstDocumentIntance = {
        documentId: 1,
      };

      const documentDAO = new DocumentDAO();

      try {
        await documentDAO.uploadResource(firstDocumentIntance.documentId, []);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe("No file uploaded");
      }
    });
  });

  describe("getResourceById", () => {
    it("should return the requested resource", async () => {
      const resourceId = 1;
      const testFile: any = {
        fieldname: "file",
        originalname: "test.pdf",
        encoding: "7bit",
        mimetype: "application/pdf",
        buffer: Buffer.from("test", "utf-8"),
        size: 4,
        destination: "",
        filename: "",
      };

      const documentDAO = new DocumentDAO();

      const mockDBGet = jest
        .spyOn(db, "get")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, testFile);
          return {} as Database;
        });

      const result = await documentDAO.getResourceById(resourceId);

      expect(result).toBeDefined();
      expect(result.fieldname).toBeDefined();
      expect(result.originalname).toBeDefined();
      expect(result.encoding).toBeDefined();
      expect(result.mimetype).toBeDefined();
      expect(result.buffer).toBeDefined();
      expect(result.size).toBeDefined();
      expect(result.destination).toBeDefined();
      expect(result.filename).toBeDefined();
      mockDBGet.mockRestore();
    });
  });

  describe("getResourcesByDocumentId", () => {
    it("should return the requested resources of a document", async () => {
      const documentId = 1;
      const testFile: any = {
        fieldname: "file",
        originalname: "test.pdf",
        encoding: "7bit",
        mimetype: "application/pdf",
        buffer: Buffer.from("test", "utf-8"),
        size: 4,
        destination: "",
        filename: "",
      };

      const documentDAO = new DocumentDAO();

      const mockDBAll = jest
        .spyOn(db, "all")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, [testFile]);
          return {} as Database;
        });

      const result = await documentDAO.getResourcesByDocumentId(documentId);

      expect(result).toBeDefined();
      expect(result[0].fieldname).toBeDefined();
      expect(result[0].originalname).toBeDefined();
      expect(result[0].encoding).toBeDefined();
      expect(result[0].mimetype).toBeDefined();
      expect(result[0].buffer).toBeDefined();
      expect(result[0].size).toBeDefined();
      expect(result[0].destination).toBeDefined();
      expect(result[0].filename).toBeDefined();
      mockDBAll.mockRestore();
    });
  });

  // KX8 (Search documents)
  describe("getFilteredDocuments", () => {
    it("should return the searched documents", async () => {
      const filters: any = {
        documentType: "Text",
      };
      const expectedDocuments = [
        {
          documentId: 1,
          title: "Test Title 1",
          description: "Test Description 1",
          documentTypeName: "Text",
          scale: "Text",
          nodeTypeName: "Design document",
          stakeholders: `["Municipality", "Architectural firm"]`,
          issuanceDate: "2023-11-13",
          language: "English",
          pages: "100",
          georeference: {
            georeferenceId: 101,
            coordinates: "[1.1, 2.2]",
            georeferenceName: "Test Georeference 1",
            isArea: 0,
          },
        },
        {
          documentId: 2,
          title: "Test Title 2",
          description: "Test Description 2",
          documentTypeName: "Text",
          scale: "1:500",
          nodeTypeName: "Design document",
          stakeholders: `["Municipality"]`,
          issuanceDate: "2023-11-13",
          language: "Swedish",
          pages: "1-100",
          georeference: {
            georeferenceId: 102,
            coordinates: "[1.1, 2.2]",
            georeferenceName: "Test Georeference 2",
            isArea: 0,
          },
        },
      ];

      const documentDAO = new DocumentDAO();

      const mockDBAll = jest
        .spyOn(db, "all")
        .mockImplementationOnce((sql, params, callback) => {
          callback(null, expectedDocuments);
          return {} as Database;
        });

      const result = await documentDAO.getFilteredDocuments(filters);

      expect(result).toBeDefined();
      expect(result[0].title).toBeDefined();
      expect(result[0].description).toBeDefined();
      expect(result[0].documentType).toBeDefined();
      expect(result[0].scale).toBeDefined();
      expect(result[0].nodeType).toBeDefined();
      expect(result[0].stakeholders).toBeDefined();
      expect(result[0].issuanceDate).toBeDefined();
      expect(result[0].language).toBeDefined();
      expect(result[0].pages).toBeDefined();
      expect(result[0].georeference).toBeDefined();
      mockDBAll.mockRestore();
    });
  });

  // KX18 (Add attachments)
  describe("uploadAttachment", () => {
    it("should throw an exception when no files provided", async () => {
      const firstDocumentIntance = {
        documentId: 1,
      };

      const documentDAO = new DocumentDAO();

      try {
        await documentDAO.uploadAttachment(firstDocumentIntance.documentId, []);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe("No file uploaded");
      }
    });
  });
});
