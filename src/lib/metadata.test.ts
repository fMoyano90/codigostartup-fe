import { describe, expect, it } from "vitest";
import { createPageMetadata } from "./metadata";

describe("createPageMetadata", () => {
  it("creates route-specific canonical and social URLs", () => {
    const metadata = createPageMetadata({
      title: "Software a medida",
      description: "Descripción",
      path: "/soluciones/software-a-medida",
    });

    const expectedUrl = "https://codigostartup.com/soluciones/software-a-medida";
    expect(metadata.alternates?.canonical).toBe(expectedUrl);
    expect(metadata.openGraph?.url).toBe(expectedUrl);
  });

  it("keeps the document title short (branded by the root template) but brands social titles", () => {
    const metadata = createPageMetadata({
      title: "Software a medida",
      description: "Descripción",
      path: "/soluciones/software-a-medida",
    });

    expect(metadata.title).toBe("Software a medida");
    expect(metadata.openGraph?.title).toBe("Software a medida | Código Startup");
    expect(metadata.twitter?.title).toBe("Software a medida | Código Startup");
  });

  it("does not hardcode a social image (the opengraph-image convention provides it)", () => {
    const metadata = createPageMetadata({
      title: "Nosotros",
      description: "Descripción",
      path: "/nosotros",
    });

    expect(metadata.openGraph?.images).toBeUndefined();
    expect(metadata.twitter?.images).toBeUndefined();
  });
});
