import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.util.Set;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * @author harshmeet
 */
public class Task1 {
	private static Set<String> pagesVisited = new HashSet<>();
	private static Queue<String> pagesToVisit = new LinkedList<>();
	public static int fileCount = 0;
	public static int depth = 6;
	public static int maxDocs = 1000;

	/**
	 * 
	 * @param root
	 * @param level
	 * @return Integer
	 * @throws IOException
	 * @throws InterruptedException
	 */
	// CRAWLING USING DEPTH FIRST SEARCH
	public static int DFSCrawl(String root, int level) throws IOException,
	InterruptedException {
		if (level > depth)
			return 0;
		if (pagesVisited.size() > maxDocs)
			return 0;
		BufferedWriter writer = new BufferedWriter(new FileWriter(
			"linksDFS.txt", true));
		fileCount++;

		Thread.sleep(1000);
		Document document = Jsoup.connect(root).get();
		pagesVisited.add(root);

		// write in the links file
		writer.write(root);
		writer.write("\n");
		writer.close();
		Element linksOnPage = document.getElementById("bodyContent");
		Elements links = linksOnPage.getElementsByTag("a");
		for (Element page : links) {
			String contendor = page.attr("href");
			contendor = testURL(contendor);
			if (!contendor.equals("")) {
				if (!pagesVisited.contains(contendor))
					DFSCrawl(contendor, level + 1);
			}
		}
		return 0;
	}

	/**
	 * @param contendor
	 * @return String URL
	 */
	// Method to extract the correct URLs
	public static String testURL(String contendor) {
		if (contendor == null || contendor.equals(""))
			return "";

		// 1.remove the # links then return empty string
		if (contendor.startsWith("#"))
			return "";

		// 2. Remove the Main Page then return empty string
		else if (contendor.startsWith("https://en.wikipedia.org/wiki/Main_Page"))
			return "";

		// 3. if url contains images and animations then return empty string
		else if ((contendor.endsWith(".jpg")) || (contendor.endsWith(".png"))
			|| (contendor.endsWith(".tiff")) || (contendor.endsWith(".gif")
				|| (contendor.endsWith(".svg"))))
		{
			return "";
		}

		// 4.if url contains textual media like pdf then then return empty string
		else if ((contendor.endsWith(".txt")) || (contendor.endsWith(".pdf"))) 
		{
			return "";
		}

		// 5. if url contains : or administrative links then return empty string
		else if (contendor.contains(":"))
		{
			return "";
		}

		// 6. If url contains external links then return empty string
		else if ((contendor.startsWith("http") || contendor.startsWith("www"))
			&& !contendor.contains("en.wikipedia.org"))
			return "";

		// 7. If url contains index then return empty string
		else if (contendor.contains("index.php"))
			return "";

		// 8. If url contains wiki media then return empty string
		else if (contendor.contains("wikimedia"))
			return "";

		// 9. upon inspection some urls which begin with '//'
		//these are absolute urls or uploads for wikipedia. 
		else if (contendor.startsWith("//")) 
		{ 
			String temp = new String(contendor);
			while (temp.startsWith("/"))
				temp = temp.replaceFirst("/", "");
			return testURL(temp);
		}

		// 10. handle relative urls.
		else if (contendor.startsWith("/") || contendor.contains(
			"en.wikipedia.org")) {
			contendor = canonacalize(contendor);
			return contendor;
		}
		return "";
	}
	/**
	 * 
	 * @param url
	 * @return String URL
	 */
	// Method to handle absolute and relative url
	public static String canonacalize(String url) {
		if (url.startsWith("http") || url.startsWith("www") || url.startsWith(
			"en.wikipedia.org"))
			return url;
		// relative
		while (url.startsWith("/")) {
			url = url.replaceFirst("/", "");
		}
		return "https://en.wikipedia.org" + "/" + url;
	}
	/**
	 * 
	 * @param root
	 * @throws IOException
	 * @throws InterruptedException
	 */
	// CRAWLING USING BREADTH FIRST SEARCH
	public static void bfsCrawl(String root)
		throws IOException, InterruptedException {
		BufferedWriter writer ;
		int level = 0;
		pagesToVisit.add(root);
		pagesToVisit.add("levelUp for BFS");
		while (!pagesToVisit.isEmpty()) {
			String crawledURL = pagesToVisit.poll();
			// check if already crawled/
			if (pagesVisited.contains(crawledURL))
				continue;
			//handle the case where the queue gets empty before reaching the depth 6
			if (crawledURL.equals("levelUp for BFS")) {
				if (pagesToVisit.isEmpty()) break;
				pagesToVisit.add("levelUp for BFS");
				level++;
				if (level > depth)
					break;
				continue;
			}
			//     Write links to file
			writer = new BufferedWriter(new FileWriter(
				"linksBFS.txt", true));
			writer.write(crawledURL);
			writer.write("\n");
			writer.close();
			Document document = Jsoup.connect(crawledURL).get();
			fileCount++;
			BufferedWriter writer1 = new BufferedWriter(new FileWriter(fileCount+".txt"));
			writer1.write(crawledURL);
			writer1.write("\n");
			Element linksOnPage = document.getElementById("bodyContent");
			Elements links = linksOnPage.getElementsByTag("a");
			pagesVisited.add(crawledURL);

			for (Element page : links) {
				String contendor = page.attr("href");
				contendor = testURL(contendor);
				if (!contendor.equals("")) {
					pagesToVisit.add(contendor);
				}
			}
			Thread.sleep(1000);
			writer1.write(document.html());
			writer1.close();
			if (pagesVisited.size() > maxDocs) {
				System.out.println(level);
				break;
			}
		}
	}
	/**
	 * 
	 * @param args
	 * @throws IOException
	 * @throws InterruptedException
	 */
	public static void main(String[] args) throws IOException,
	InterruptedException {
		 Scanner sc=new Scanner(System.in);  
		 System.out.println("Enter seed URL"); 
		 String seed=sc.nextLine();
		 System.out.println("Enter bfsCrawl or dfsCrawl");
		 String crawl=sc.nextLine();
		 if(crawl.equals("bfsCrawl")) Task1.bfsCrawl(seed);
		 else if(crawl.equals("dfsCrawl")) Task1.DFSCrawl(seed, 1);
		 else {
			 System.out.println("Error");
		 }
		 System.exit(0);
	}

}