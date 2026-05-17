import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.43.106.115"],

  async redirects() {
    return [
      {
        source: "/notes",
        destination: "/library",
        permanent: false,
      },
      {
        source: "/notes/semester_2/ecology/idc_151/unit_4",
        destination: "/library/semester-2/ecology/idc-151/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/dsc_101/unit_1",
        destination: "/library/semester-1/history/dsc-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_2/zoology/idc_151/unit_1",
        destination: "/library/semester-2/zoology/idc-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/economics/sec_101/unit_4",
        destination: "/library/semester-1/economics/sec-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/physics/dsc_101/unit_3",
        destination: "/library/semester-1/physics/dsc-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/chemistry/dsc_102/unit_1",
        destination: "/library/semester-1/chemistry/dsc-102/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_2/zoology/sec_151/unit_2",
        destination: "/library/semester-2/zoology/sec-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_6/physics/dsc_353/unit_1",
        destination: "/library/semester-6/physics/dsc-353/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/ecology/idc_101/unit_3",
        destination: "/library/semester-1/ecology/idc-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/philosophy/dsc_151/unit_3",
        destination: "/library/semester-2/philosophy/dsc-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/political_science/dsc_151/unit_1",
        destination:
          "/library/semester-2/political-science/dsc-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/computer_science/dsm_101/unit_2",
        destination:
          "/library/semester-1/computer-science/dsm-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/zoology/sec_101/unit_5",
        destination: "/library/semester-1/zoology/sec-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_4/philosophy/dsm_252/unit_5",
        destination: "/library/semester-4/philosophy/dsm-252/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_4/history/dsc_252/unit_1",
        destination: "/library/semester-4/history/dsc-252/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_6/physics/dsc_352/unit_2",
        destination: "/library/semester-6/physics/dsc-352/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/dsc_201/unit_2",
        destination: "/library/semester-3/biotechnology/dsc-201/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/economics/dsc_102/unit_3",
        destination: "/library/semester-1/economics/dsc-102/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/zoology/sec_151/unit_5",
        destination: "/library/semester-2/zoology/sec-151/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/sec_101/unit_5",
        destination:
          "/library/semester-1/political-science/sec-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/chemistry/sec_101/unit_3",
        destination: "/library/semester-1/chemistry/sec-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/dsc_102/unit_1",
        destination:
          "/library/semester-1/political-science/dsc-102/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/philosophy/idc_101/unit_4",
        destination: "/library/semester-1/philosophy/idc-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/philosophy/dsc_102/unit_4",
        destination: "/library/semester-1/philosophy/dsc-102/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/physics/idc_101/unit_5",
        destination: "/library/semester-1/physics/idc-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/geology/sec_101/unit_2",
        destination: "/library/semester-1/geology/sec-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_2/history/dsc_151/unit_4",
        destination: "/library/semester-2/history/dsc-151/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/idc_201/unit_5",
        destination: "/library/semester-3/biotechnology/idc-201/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/economics/dsc_101/unit_5",
        destination: "/library/semester-1/economics/dsc-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/dsc_101/unit_4",
        destination:
          "/library/semester-1/political-science/dsc-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/ecology/sec_101/unit_3",
        destination: "/library/semester-1/ecology/sec-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/chemistry/sec_101/unit_4",
        destination: "/library/semester-1/chemistry/sec-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/physics/dsc_102/unit_1",
        destination: "/library/semester-1/physics/dsc-102/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/geology/idc_101/unit_2",
        destination: "/library/semester-1/geology/idc-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/geology/idc_101/unit_1",
        destination: "/library/semester-1/geology/idc-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/computer_science/dsc_102/unit_3",
        destination:
          "/library/semester-1/computer-science/dsc-102/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/dsc_102/unit_1",
        destination: "/library/semester-1/history/dsc-102/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/statistics/dsm_101/unit_5",
        destination: "/library/semester-1/statistics/dsm-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_3/philosophy/dsm_201/unit_5",
        destination: "/library/semester-3/philosophy/dsm-201/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_2/computer_science/idc_151/unit_3",
        destination:
          "/library/semester-2/computer-science/idc-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/zoology/dsc_152/unit_2",
        destination: "/library/semester-2/zoology/dsc-152/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/mathematics/dsc_102/unit_3",
        destination: "/library/semester-1/mathematics/dsc-102/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/physics/idc_101/unit_4",
        destination: "/library/semester-1/physics/idc-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_3/philosophy/dsc_201/unit_2",
        destination: "/library/semester-3/philosophy/dsc-201/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/chemistry/idc_101/unit_1",
        destination: "/library/semester-1/chemistry/idc-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_2/geology/sec_151/unit_3",
        destination: "/library/semester-2/geology/sec-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/physics/dsm_151/unit_5",
        destination: "/library/semester-2/physics/dsm-151/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/dsm_201/unit_3",
        destination: "/library/semester-3/biotechnology/dsm-201/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/education/dsc_102/unit_1",
        destination: "/library/semester-1/education/dsc-102/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/dsc_102/unit_2",
        destination: "/library/semester-1/history/dsc-102/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/dsm_101/unit_5",
        destination: "/library/semester-1/history/dsm-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/sec_101/unit_3",
        destination: "/library/semester-1/history/sec-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/mathematics/dsc_101/unit_3",
        destination: "/library/semester-1/mathematics/dsc-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/statistics/sec_101/unit_2",
        destination: "/library/semester-1/statistics/sec-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/dsc_102/unit_4",
        destination: "/library/semester-1/history/dsc-102/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/ecology/dsm_101/unit_2",
        destination: "/library/semester-1/ecology/dsm-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_2/computer_science/sec_151/unit_2",
        destination:
          "/library/semester-2/computer-science/sec-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_2/botany/sec_151/unit_3",
        destination: "/library/semester-2/botany/sec-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/dsc_201/unit_1",
        destination: "/library/semester-3/biotechnology/dsc-201/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_2/political_science/idc_151/unit_1",
        destination:
          "/library/semester-2/political-science/idc-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_2/philosophy/idc_151/unit_2",
        destination: "/library/semester-2/philosophy/idc-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/zoology/sec_101/unit_2",
        destination: "/library/semester-1/zoology/sec-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_2/biotechnology/dsc_151/unit_4",
        destination: "/library/semester-2/biotechnology/dsc-151/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_2/history/dsc_152/unit_3",
        destination: "/library/semester-2/history/dsc-152/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/political_science/dsc_152/unit_5",
        destination:
          "/library/semester-2/political-science/dsc-152/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_2/mathematics/idc_151/unit_4",
        destination: "/library/semester-2/mathematics/idc-151/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/dsc_102/unit_2",
        destination:
          "/library/semester-1/political-science/dsc-102/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/statistics/idc_101/unit_2",
        destination: "/library/semester-1/statistics/idc-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/geology/dsm_101/unit_1",
        destination: "/library/semester-1/geology/dsm-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/philosophy/dsc_101/unit_5",
        destination: "/library/semester-1/philosophy/dsc-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/philosophy/dsc_102/unit_2",
        destination: "/library/semester-1/philosophy/dsc-102/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_2/ecology/sec_151/unit_1",
        destination: "/library/semester-2/ecology/sec-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/education/dsm_101/unit_1",
        destination: "/library/semester-1/education/dsm-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_2/history/sec_151/unit_3",
        destination: "/library/semester-2/history/sec-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/geology/dsc_152/unit_5",
        destination: "/library/semester-2/geology/dsc-152/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/dsc_102/unit_3",
        destination:
          "/library/semester-1/political-science/dsc-102/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/idc_101/unit_2",
        destination: "/library/semester-1/history/idc-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/dsm_201/unit_1",
        destination: "/library/semester-3/biotechnology/dsm-201/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/sec_101/unit_2",
        destination: "/library/semester-1/history/sec-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/mathematics/dsc_102/unit_5",
        destination: "/library/semester-1/mathematics/dsc-102/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_2/history/dsm_151/unit_1",
        destination: "/library/semester-2/history/dsm-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/education/dsc_101/unit_2",
        destination: "/library/semester-1/education/dsc-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/idc_101/unit_4",
        destination:
          "/library/semester-1/political-science/idc-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_2/physics/sec_151/unit_4",
        destination: "/library/semester-2/physics/sec-151/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_2/computer_science/idc_151/unit_2",
        destination:
          "/library/semester-2/computer-science/idc-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/philosophy/sec_101/unit_4",
        destination: "/library/semester-1/philosophy/sec-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_2/political_science/idc_151/unit_2",
        destination:
          "/library/semester-2/political-science/idc-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_3/philosophy/idc_201/unit_1",
        destination: "/library/semester-3/philosophy/idc-201/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/dsc_202/unit_5",
        destination: "/library/semester-3/biotechnology/dsc-202/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/mathematics/sec_101/unit_4",
        destination: "/library/semester-1/mathematics/sec-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_2/mathematics/dsc_151/unit_5",
        destination: "/library/semester-2/mathematics/dsc-151/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/dsc_202/unit_1",
        destination: "/library/semester-3/biotechnology/dsc-202/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/dsc_202/unit_4",
        destination: "/library/semester-3/biotechnology/dsc-202/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/dsc_202/unit_3",
        destination: "/library/semester-3/biotechnology/dsc-202/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/mathematics/idc_151/unit_5",
        destination: "/library/semester-2/mathematics/idc-151/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_3/philosophy/dsm_201/unit_2",
        destination: "/library/semester-3/philosophy/dsm-201/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/ecology/dsc_102/unit_1",
        destination: "/library/semester-1/ecology/dsc-102/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_2/zoology/idc_151/unit_2",
        destination: "/library/semester-2/zoology/idc-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_2/economics/dsc_152/unit_2",
        destination: "/library/semester-2/economics/dsc-152/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_3/botany/dsm_201/unit_3",
        destination: "/library/semester-3/botany/dsm-201/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/physics/dsc_101/unit_2",
        destination: "/library/semester-1/physics/dsc-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/computer_science/idc_101/unit_2",
        destination:
          "/library/semester-1/computer-science/idc-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_5/philosophy/dsc_302/unit_4",
        destination: "/library/semester-5/philosophy/dsc-302/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_2/botany/sec_151/unit_1",
        destination: "/library/semester-2/botany/sec-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_3/biotechnology/idc_201/unit_4",
        destination: "/library/semester-3/biotechnology/idc-201/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/ecology/dsc_102/unit_4",
        destination: "/library/semester-1/ecology/dsc-102/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/idc_101/unit_1",
        destination: "/library/semester-1/history/idc-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/philosophy/idc_101/unit_2",
        destination: "/library/semester-1/philosophy/idc-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/botany/sec_101/unit_1",
        destination: "/library/semester-1/botany/sec-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/dsc_101/unit_2",
        destination:
          "/library/semester-1/political-science/dsc-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_2/botany/dsm_151/unit_5",
        destination: "/library/semester-2/botany/dsm-151/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_2/history/dsc_152/unit_5",
        destination: "/library/semester-2/history/dsc-152/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/education/sec_101/unit_1",
        destination: "/library/semester-1/education/sec-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_2/ecology/idc_151/unit_3",
        destination: "/library/semester-2/ecology/idc-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/mathematics/sec_151/unit_1",
        destination: "/library/semester-2/mathematics/sec-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/geology/dsc_101/unit_1",
        destination: "/library/semester-1/geology/dsc-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/dsc_101/unit_3",
        destination:
          "/library/semester-1/political-science/dsc-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/computer_science/dsm_151/unit_5",
        destination:
          "/library/semester-2/computer-science/dsm-151/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_2/history/dsc_151/unit_2",
        destination: "/library/semester-2/history/dsc-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/statistics/dsc_101/unit_4",
        destination: "/library/semester-1/statistics/dsc-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/education/sec_101/unit_4",
        destination: "/library/semester-1/education/sec-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/chemistry/dsm_101/unit_2",
        destination: "/library/semester-1/chemistry/dsm-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/botany/idc_101/unit_5",
        destination: "/library/semester-1/botany/idc-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/economics/sec_101/unit_5",
        destination: "/library/semester-1/economics/sec-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_2/physics/dsc_151/unit_1",
        destination: "/library/semester-2/physics/dsc-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/dsm_101/unit_1",
        destination:
          "/library/semester-1/political-science/dsm-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/chemistry/dsc_101/unit_3",
        destination: "/library/semester-1/chemistry/dsc-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/statistics/dsc_151/unit_2",
        destination: "/library/semester-2/statistics/dsc-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/ecology/sec_101/unit_5",
        destination: "/library/semester-1/ecology/sec-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/zoology/dsm_101/unit_3",
        destination: "/library/semester-1/zoology/dsm-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/chemistry/dsm_101/unit_3",
        destination: "/library/semester-1/chemistry/dsm-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/economics/dsc_151/unit_3",
        destination: "/library/semester-2/economics/dsc-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/physics/sec_151/unit_5",
        destination: "/library/semester-2/physics/sec-151/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/philosophy/dsc_101/unit_4",
        destination: "/library/semester-1/philosophy/dsc-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/mathematics/sec_101/unit_2",
        destination: "/library/semester-1/mathematics/sec-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/chemistry/sec_101/unit_1",
        destination: "/library/semester-1/chemistry/sec-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_3/philosophy/dsc_202/unit_3",
        destination: "/library/semester-3/philosophy/dsc-202/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/statistics/dsm_151/unit_2",
        destination: "/library/semester-2/statistics/dsm-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/ecology/dsc_101/unit_3",
        destination: "/library/semester-1/ecology/dsc-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/philosophy/dsc_151/unit_4",
        destination: "/library/semester-2/philosophy/dsc-151/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/history/dsc_102/unit_5",
        destination: "/library/semester-1/history/dsc-102/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_2/zoology/sec_151/unit_1",
        destination: "/library/semester-2/zoology/sec-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/sec_101/unit_4",
        destination:
          "/library/semester-1/political-science/sec-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_2/physics/dsm_151/unit_1",
        destination: "/library/semester-2/physics/dsm-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/computer_science/idc_101/unit_5",
        destination:
          "/library/semester-1/computer-science/idc-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/economics/idc_101/unit_5",
        destination: "/library/semester-1/economics/idc-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_2/zoology/idc_151/unit_3",
        destination: "/library/semester-2/zoology/idc-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/botany/dsm_151/unit_3",
        destination: "/library/semester-2/botany/dsm-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_1/political_science/dsm_101/unit_4",
        destination:
          "/library/semester-1/political-science/dsm-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/zoology/dsm_101/unit_2",
        destination: "/library/semester-1/zoology/dsm-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/zoology/dsc_101/unit_2",
        destination: "/library/semester-1/zoology/dsc-101/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_2/economics/idc_151/unit_4",
        destination: "/library/semester-2/economics/idc-151/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/botany/dsc_101/unit_1",
        destination: "/library/semester-1/botany/dsc-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_2/history/dsc_152/unit_1",
        destination: "/library/semester-2/history/dsc-152/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/zoology/dsc_101/unit_5",
        destination: "/library/semester-1/zoology/dsc-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/education/idc_101/unit_3",
        destination: "/library/semester-1/education/idc-101/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/botany/dsc_152/unit_5",
        destination: "/library/semester-2/botany/dsc-152/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_4/economics/dsc_253/unit_2",
        destination: "/library/semester-4/economics/dsc-253/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_2/history/dsc_151/unit_3",
        destination: "/library/semester-2/history/dsc-151/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/philosophy/dsc_151/unit_2",
        destination: "/library/semester-2/philosophy/dsc-151/notes/unit-2",
        permanent: false,
      },
      {
        source: "/notes/semester_1/botany/sec_101/unit_4",
        destination: "/library/semester-1/botany/sec-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_2/geology/dsc_151/unit_1",
        destination: "/library/semester-2/geology/dsc-151/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_6/chemistry/dsm_351/unit_3",
        destination: "/library/semester-6/chemistry/dsm-351/notes/unit-3",
        permanent: false,
      },
      {
        source: "/notes/semester_2/biotechnology/dsm_151/unit_5",
        destination: "/library/semester-2/biotechnology/dsm-151/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/biotechnology/idc_101/unit_4",
        destination: "/library/semester-1/biotechnology/idc-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_2/biotechnology/sec_151/unit_5",
        destination: "/library/semester-2/biotechnology/sec-151/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/physics/dsm_101/unit_5",
        destination: "/library/semester-1/physics/dsm-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/philosophy/dsm_101/unit_4",
        destination: "/library/semester-1/philosophy/dsm-101/notes/unit-4",
        permanent: false,
      },
      {
        source: "/notes/semester_1/zoology/sec_101/unit_1",
        destination: "/library/semester-1/zoology/sec-101/notes/unit-1",
        permanent: false,
      },
      {
        source: "/notes/semester_1/biotechnology/idc_101/unit_5",
        destination: "/library/semester-1/biotechnology/idc-101/notes/unit-5",
        permanent: false,
      },
      {
        source: "/notes/semester_1/environmental_science/eche_110/unit_9",
        destination:
          "/library/semester-1/environmental-science/eche-110/notes/unit-9",
        permanent: false,
      },
      {
        source: "/notes/semester_1/environmental_science/eche_110/unit_7",
        destination:
          "/library/semester-1/environmental-science/eche-110/notes/unit-7",
        permanent: false,
      },
      {
        source: "/notes/semester_2/philosophy/idc_151/unit_3",
        destination: "/library/semester-2/philosophy/idc-151/notes/unit-3",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
