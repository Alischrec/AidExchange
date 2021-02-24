// import React, { useState, useEffect } from "react";
import React from "react";
import icon from "./pdficon.png";
import {
  PDFDownloadLink,
  Text,
  Document,
  Page,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Table } from "react-bootstrap";

// Register font
Font.register({
  family: "Roboto",
  src: "https://fonts.googleapis.com/css?family=Open+Sans|Roboto",
});

// Create styles
const styles = StyleSheet.create({
  heading: {
    // flexDirection: "row",
    backgroundColor: "#5c415d",
    height: "2cm",
    textAlign: "center",
    color: "white",
    borderBottom: "#AEA0AE",
    borderBottomWidth: 3,
    // margin: 20,
    paddingTop: 10,
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },

  title: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "semibold",
    marginLeft: 40,
    marginTop: 15,
    marginRight: 40,
    marginBottom: 5,
    // fontFamily: "Roboto",
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 40,
    marginTop: 5,
    marginRight: 40,
    marginBottom: 5,
  },
  date: {
    fontSize: 11,
    textAlign: "center",
    color: "white",
    // paddingTop: 5,
    // color: "#AEA0AE",
  },
  content: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    // margin: 20,
    padding: 10,
    marginLeft: 40,
    marginTop: 5,
    marginRight: 50,
    marginBottom: 5,
    fontSize: 14,
  },

  line: {
    border: 2 | "solid",
    borderColor: "grey",
    // borderBottomWidth: 1,
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

//Getting today's date
let today = new Date();

const MyDocument = (props) => (
  <Document>
    <Page size="LETTER" wrap>
      <Text style={styles.heading}>
        AidExchange
        <Text style={styles.date}>
          {"\n"}
          Date:{" "}
          {`${
            today.getMonth() + 1
          } / ${today.getDate()} / ${today.getFullYear()}`}
        </Text>
      </Text>

      <Text style={styles.title}> Hello {props.displayName}</Text>

      <Text style={styles.subtitle}>
        {props.postType}ed items for: {props.title}{" "}
      </Text>
      {/* <Text style={styles.content}>
        {
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Quantity ${props.postType}ed</th>
              </tr>
            </thead>
            <tbody>
              $
              {props.contents.map((line, index) => {
                return (
                  <tr key={index}>
                    <td>{line.item}</td>
                    <td>{line.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        }
      </Text> */}

      <Text style={styles.content}>
        <Text> Quantity {"    "} Description</Text>
        <Text>
          {"\n"}
          ------------------------------------------------------- {"\n"}{" "}
        </Text>
        {props.contents.map((line, i) => {
          return (
            <Text style={{ borderBottomWidth: 2, border: "solid" }} key={i}>
              {" "}
              {line.quantity + "            " + line.item + "\n "}
            </Text>
          );
        })}
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const Print = (props) => {
  console.log("Listing: ", props.listing);

  return (
    <div>
      <PDFDownloadLink
        // key={listing.userId}
        document={
          <MyDocument
            postType={props.listing.postType}
            displayName={props.listing.postBy.displayName}
            title={props.listing.title}
            contents={props.listing.contents}
            status={props.listing.status}
          />
        }
        fileName="example.pdf"
      >
        {/* <img src="pdficon.png" /> */}

        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <img
              src={icon}
              width="35"
              height="35"
              style={{ float: "right", marginBottom: "1%" }}
              alt="PDF icon to print a packing list"
            />
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Print;
